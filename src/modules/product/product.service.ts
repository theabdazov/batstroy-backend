import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from './entity/product.entity';
import { ProductAddingDto } from './dto/product-adding.dto';
import { ProductDto } from './dto/product.dto';
import { PaginationPageDto } from '../dto/pagination-page.dto';
import { ProductFilter } from './dto/product-filter';
import { CategoryEntity } from '../category/entity/category.entity';
import { ProductFilterPublic } from './dto/product-filter-public';
import { ProductShortPublic } from './dto/product-short-public';
import { CategoryService } from '../category/category.service';
import { ProductDetailPublic } from './dto/product-detail-public';
import { ProductCharacteristicService } from '../product-characteristic/product-characteristic.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity) private repoCategory: Repository<CategoryEntity>,
    private categoryService: CategoryService,
    private productCharacteristicService: ProductCharacteristicService,
  ) {
  }

  async create(addingDto: ProductAddingDto): Promise<ProductDto> {
    const { companyId, saleTypeId, ...data } = addingDto;
    const product = plainToClass(ProductEntity, {
      ...this.repo.create(),
      ...data,
      company: companyId ? { id: companyId } : null,
      saleType: saleTypeId ? { id: saleTypeId } : null,
    });
    const productEntity = await this.repo.save(product);
    if (addingDto.characteristics && addingDto.characteristics.length) {
      await this.productCharacteristicService.addingMany(productEntity.id, addingDto.characteristics);
    }
    return this.getById(productEntity.id);
  }

  async getById(id: number): Promise<ProductDto> {
    const entity: ProductEntity = await this.repo.findOneOrFail(id, { relations: ['company'] });
    const characteristics = await this.productCharacteristicService.getByProductId(id);
    return { ...plainToClass(ProductDto, entity), characteristics: characteristics };
  }

  async update(id: number, addingDto: ProductAddingDto): Promise<ProductDto> {
    const { companyId, saleTypeId, ...data } = addingDto;
    const product = plainToClass(ProductEntity, {
      ...await this.repo.findOne(id),
      ...data,
      company: companyId ? { id: companyId } : null,
      saleType: saleTypeId ? { id: saleTypeId } : null,
    });
    await this.repo.save(product);
    if (addingDto.characteristics && addingDto.characteristics.length) {
      await this.productCharacteristicService.deleteByProductId(id);
      await this.productCharacteristicService.addingMany(id, addingDto.characteristics);
    } else {
      await this.productCharacteristicService.deleteByProductId(id);
    }
    return this.getById(id);
  }

  async deleteById(id: number): Promise<ProductDto> {
    return this.getById(id).then(product => {
      return this.productCharacteristicService.deleteByProductId(id).then(() => this.repo.delete(id)).then(() => product);
    });
  }

  getProductList(adminFilter: ProductFilter): Promise<PaginationPageDto<ProductDto>> {
    const filter: FindConditions<ProductEntity> = {};
    if (adminFilter) {
      if (adminFilter.id) {
        filter.id = adminFilter.id;
      }
      if (adminFilter.name) {
        filter.name = Like(`%${adminFilter.name}%`);
      }
      if (adminFilter.categoryIds && adminFilter.categoryIds.length) {
        filter.categoryId = In(adminFilter.categoryIds);
      }
      if (adminFilter.companyIds && adminFilter.companyIds.length) {
        filter.company = In(adminFilter.companyIds);
      }
    }
    return this.repo.findAndCount({
      skip: adminFilter.page * adminFilter.count,
      take: adminFilter.count,
      where: filter,
      order: {
        id: 'ASC',
      },
      relations: ['company', 'saleType'],
    }).then(
      result => {
        return {
          data: plainToClass(ProductDto, result[0]),
          totalCount: result[1],
        };
      },
    );
  }

  async getProductListPublic(filter: ProductFilterPublic) {
    const findConditions: FindConditions<ProductEntity> = {};
    if (filter) {
      if (filter.name) {
        findConditions.name = Like(`%${filter.name}%`);
      }
      if (filter.categoryId) {
        const ids = [filter.categoryId, ...await this.categoryService.getDescendantsTreesIds(filter.categoryId)];
        findConditions.categoryId = In(ids);
      }
    }
    return this.repo.findAndCount({
      skip: filter.page * filter.count,
      take: filter.count,
      where: findConditions,
      loadEagerRelations: false,
      relations: ['saleType'],
    }).then(
      result => {
        return {
          data: plainToClass(ProductShortPublic, result[0]),
          totalCount: result[1],
        };
      },
    );
  }

  async getByIdPublic(id: number): Promise<ProductDetailPublic> {
    const entity: ProductEntity = await this.repo.findOneOrFail(id, { relations: ['saleType'] });
    const characteristics = await this.productCharacteristicService.getByProductId(id);
    return { ...plainToClass(ProductDetailPublic, entity), characteristics: characteristics };
  }

  async getByIdsPublic(ids: number[]) {
    return this.repo.findByIds(ids).then(
      result => plainToClass(ProductShortPublic, result),
    );
  }

}
