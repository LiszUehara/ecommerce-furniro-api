import { IsDate, IsDateString, IsInt, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;
  @IsString()
  imageLink: string;
  categoryId: number;
  sku: string;
  description: string;
  largeDescription: string;
  otherImagesLinks: string;
  isNew: boolean;
  discountPercent: number;
  discountPrice: number;
  price: number;
}
