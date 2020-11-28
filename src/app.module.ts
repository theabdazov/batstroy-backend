import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { FilesModule } from './modules/files/files.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { SaleTypeModule } from './modules/sale-type/sale-type.module';
import { ProductCharacteristicModule } from './modules/product-characteristic/product-characteristic.module';
import { ProductCharacteristicSuggestModule } from './modules/product-characteristic-suggest/product-characteristic-suggest.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      },
    ),
    TypeOrmModule.forRoot(),
    CategoryModule,
    UserModule,
    CompanyModule,
    FilesModule,
    ProductModule,
    AuthModule,
    OrderModule,
    SaleTypeModule,
    ProductCharacteristicModule,
    ProductCharacteristicSuggestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
