import { ApiProperty } from '@nestjs/swagger';

export class PageOptionsDto {
  @ApiProperty({ required: false, default: 1 })
  readonly page?: string | number = 1;

  @ApiProperty({ required: false, default: 16 })
  readonly limit?: string | number = 16;

  @ApiProperty({ required: false })
  readonly isNew?: string;

  @ApiProperty({ required: false, type: [Number] })
  readonly categoryIds?: string;

  @ApiProperty({ required: false })
  readonly order?: string;

  @ApiProperty({ required: false })
  readonly showDiscounts?: string;
}