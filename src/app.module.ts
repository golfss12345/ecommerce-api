import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './configs/env.confg';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ProductVariantModule } from './product-variant/product-variant.module';
import { ReviewModule } from './review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize:
          configService.get<string>('NODE_ENV') !== 'production' ? true : false,
      }),
    }),
    ProductModule,
    UserModule,
    CategoryModule,
    BrandModule,
    ProductVariantModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
