import { Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, imageLink }: CreateCategoryDTO) {
    return this.prisma.categories.create({
      data: {
        name: name,
        image_link: imageLink,
      },
    });
  }

  async list() {
    return this.prisma.categories.findMany();
  }

  async show(id: number) {
    return this.prisma.categories.findUnique({
      where: {
        id,
      },
    });
  }
}
