import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './crerate-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
