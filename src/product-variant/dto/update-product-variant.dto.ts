import { PartialType } from '@nestjs/mapped-types';
import { CreateProductVariantDto } from './create-product-variant.dto';
import { IsBooleanString, IsOptional } from 'class-validator';

export class UpdateProductVariantDto extends PartialType(
  CreateProductVariantDto,
) {
  @IsOptional()
  @IsBooleanString()
  is_active?: boolean;
}
