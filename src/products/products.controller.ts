import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  //UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Response } from 'express';
import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiBearerAuth()
  @Get()
  getUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;

    return this.productService.getProducts(pageNumber, limitNumber);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseGuards(AuthGuard)
  createProduct(@Body() product: createProductsDto) {
    return this.productService.createProduct(product);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBody({ type: updateProduct })
  @ApiOkResponse({
    description: 'Product actulizado',
    schema: { example: { message: 'El producto ha podido ser actualizado' } },
  })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: Partial<updateProduct>,
  ) {
    return this.productService.updateProduct(id, productData);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProductById(id);
  }

  @Get('seeder')
  addProducts() {
    return this.productService.addProducts();
  }
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id);
  }
}
