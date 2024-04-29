import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDTO } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create({
    name,
    sku,
    categoryId,
    description,
    largeDescription,
    price,
    discountPrice,
    discountPercent,
    isNew,
    imageLink,
    otherImagesLinks,
  }: CreateProductDTO) {
    return this.prisma.products.create({
      data: {
        name: name,
        sku: sku,
        category_id: categoryId,
        description: description,
        large_description: largeDescription,
        price: price,
        discount_percent: discountPercent,
        discount_price: discountPrice,
        is_new: isNew,
        other_images_link: otherImagesLinks,
        image_link: imageLink,
      },
    });
  }

  async list(
    page?: number,
    limit?: number,
    params?: {
      isNew?: boolean;
      categoryIds?: number[];
      showDiscounts?: boolean;
    },
    order?: string,
  ) {
    const where: any = {};
    let orderBy = {};

    if (order === 'desc') {
      orderBy = { id: 'desc' };
    } else if (order === 'asc') {
      orderBy = { id: 'asc' };
    }

    if (params) {
      if (params.isNew !== undefined) {
        where["is_new"] = params.isNew;
      }
      if (params.showDiscounts != undefined) {
        where.OR = [];

        if (params.isNew) {
          where.OR.push({ is_new: params.isNew });
        }

        if (params.showDiscounts) {
          where.OR.push({ discount_price: { not: null } });
        }
      }

      if (params.categoryIds && params.categoryIds.length > 0) {
        where["category_id"] = {
          in: params.categoryIds,
        };
      }
    }

    if (!page || !limit) {
      const allProducts = await this.prisma.products.findMany({
        where: {
          ...where,
          OR: where.OR
        },
        orderBy
      });
      return {
        data: allProducts,
        meta: {
          itemCount: allProducts.length,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      };
    }

    const skip = (page - 1) * limit;
    const [products, total] = await this.prisma.$transaction([
      this.prisma.products.findMany({
        where: {
          ...where,
        },
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.products.count({ where }),
    ]);
    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        itemCount: products.length,
        pageCount: Math.ceil(total / limit),
        hasPreviousPage: page > 1,
        hasNextPage: page * limit < total,
      },
    };
  }

  async show(id: number) {
    const productWithCategory = await this.prisma.products.findUnique({
      where: { id },
    });

    const category = await this.prisma.categories.findUnique({
      where: {
        id: productWithCategory.category_id,
      },
    });

    const productsInCategory = await this.prisma.products.findMany({
      where: {
        category_id: productWithCategory.category_id,
      },
      take: 10,
    });

    return {
      ...productWithCategory,
      category: category,
      relatedProducts: productsInCategory,
    };
  }
}
