import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entity/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ProductModule } from '../product/product.module';
import { ReviewRepository } from './review.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ProductModule, UserModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
