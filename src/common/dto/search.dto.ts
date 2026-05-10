import { IsOptional, IsUUID } from 'class-validator';

export class SearchDto {
  @IsUUID()
  @IsOptional()
  id?: string;
}
