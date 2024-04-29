import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { PageOptionsDto } from "./dto/page-options.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Get()
  async list(@Query() pageOptionsDto: PageOptionsDto) {
    const { page, limit, isNew, categoryIds, order } = pageOptionsDto;
    const parsedPage: number | undefined =
      typeof page === "string" ? parseInt(page, 10) : page;
    const parsedLimit: number | undefined =
      typeof limit === "string" ? parseInt(limit, 10) : limit;

    const parsedCategoryIds: number[] = categoryIds
      ? categoryIds.split(",").map(Number)
      : [];

    return this.productService.list(
      parsedPage,
      parsedLimit,
      {
        isNew: isNew == "true" ? true : isNew == "false" ? false : undefined,
        categoryIds: parsedCategoryIds,
      },
      order,
    );
  }

  @Get(":id")
  async show(@Param("id", ParseIntPipe) id: number) {
    return this.productService.show(id);
  }
}
