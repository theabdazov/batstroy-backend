import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { CharacteristicModule } from './modules/characteristic/characteristic.module';
import { FilesModule } from './modules/files/files.module';
import { ProductModule } from './modules/product/product.module';
import { CharacteristicValueModule } from './modules/characteristic-value/characteristic-value.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';

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
    CharacteristicModule,
    FilesModule,
    ProductModule,
    CharacteristicValueModule,
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
