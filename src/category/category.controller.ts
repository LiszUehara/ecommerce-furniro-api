import { CategoryService } from './category.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdatePutUserDTO } from './dto/update-put-category.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDTO) {
    return this.categoryService.create(data);
  }

  @Get()
  async list() {
    return this.categoryService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.show(id);
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @Param() params) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body: UpdatePatchUserDTO, @Param() params) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params,
    };
  }
}
