import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProductEntity } from './entity/product.entity';
import { ProductAddingDto } from './dto/product-adding.dto';
import { ProductDto } from './dto/product.dto';
import { CategoryEntity } from '../category/entity/category.entity';
import { ProductPhotoEntity } from './entity/product-photo.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>,
    @InjectRepository(ProductPhotoEntity) private repoProductPhoto: Repository<ProductPhotoEntity>,
    @InjectRepository(CategoryEntity) private repoCategory: Repository<CategoryEntity>,
  ) {
  }

  async create(addingDto: ProductAddingDto): Promise<ProductDto> {
    const product = plainToClass(ProductEntity, {
      ...this.repo.create(),
      ...addingDto,
    });
    if (addingDto.categoryId) {
      product.category = await this.repoCategory.findOneOrFail(addingDto.categoryId);
    }

    const productEntity = await this.repo.save(product);
    if (addingDto.photoIds && addingDto.photoIds.length) {
      await this.repoProductPhoto.insert(
        addingDto.photoIds.map(photoId => {
          return {
            ...this.repoProductPhoto.create(),
            product: productEntity,
            photo: { id: photoId },
          };
        }),
      );
    }
    return this.getById(productEntity.id);
  }

  async getById(id: number): Promise<ProductDto> {
    const entity: ProductEntity = await this.repo.findOneOrFail(id);
    return ProductDto.from(entity);
  }

  async update(id: number, addingDto: ProductAddingDto): Promise<ProductDto> {
    const product = plainToClass(ProductEntity, {
      ...await this.repo.findOne(id),
      ...addingDto,
    });
    if (addingDto.categoryId) {
      product.category = await this.repoCategory.findOneOrFail(addingDto.categoryId);
    }
    if (addingDto.photoIds && addingDto.photoIds.length) {
      await this.repoProductPhoto.insert(
        addingDto.photoIds.map(photoId => {
          return {
            ...this.repoProductPhoto.create(),
            product: product,
            photo: { id: photoId },
          };
        }),
      );
    }
    await this.repo.save(product);
    return this.getById(id);
  }

  async deleteById(id: number): Promise<ProductDto> {
    const product = await this.getById(id);
    return this.repo.delete(id).then(
      () => product,
    );
  }

  getAll() {
    return this.repo.find().then(
      res => {
        if (res && res.length) {
          return res.map(entity => ProductDto.from(entity));
        }
        return [];
      },
    );
  }

}
