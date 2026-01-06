/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { InjectRepository } from '@nestjs/typeorm';
import { createProductsDto, updateProduct } from './Dto/creatProducts.dto';
import { Product } from './products.entity';
import { QueryFailedError, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/categories/categories.entityes';
import productsData from '../data/products.json';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  // private products: Product[] = [
  //   {
  //     id: '1',
  //     name: 'Laptop Gaming Pro',
  //     description:
  //       'Laptop de alto rendimiento para gaming con tarjeta gráfica RTX 4070',
  //     price: 1299.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/images/laptop-gaming.jpg',
  //   },
  //   {
  //     id: '2',
  //     name: 'Smartphone Ultra',
  //     description: 'Teléfono inteligente con cámara de 108MP y pantalla AMOLED',
  //     price: 899.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/images/smartphone-ultra.jpg',
  //   },
  //   {
  //     id: '3',
  //     name: 'Auriculares Inalámbricos',
  //     description: 'Auriculares con cancelación de ruido y 30h de batería',
  //     price: 249.99,
  //     stock: false,
  //     imgUrl: 'https://example.com/images/auriculares-inalambricos.jpg',
  //   },
  //   {
  //     id: '4',
  //     name: 'Smart Watch Series 8',
  //     description: 'Reloj inteligente con monitor de salud y GPS integrado',
  //     price: 399.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/images/smart-watch.jpg',
  //   },
  //   {
  //     id: '5',
  //     name: 'Tablet Pro 12.9',
  //     description: 'Tablet profesional con pantalla Liquid Retina XDR',
  //     price: 1099.99,
  //     stock: true,
  //     imgUrl: 'https://example.com/images/tablet-pro.jpg',
  //   },
  // ];

  async fillProducts(page: number, limit: number): Promise<Product[]> {
    const skip = (page - 1) * limit;

    const productTotal = await this.productRepository.find({
      skip: skip,
      take: limit,
      relations: ['category'],
    });

    return productTotal;
  }

  async createProduct(newProduct: createProductsDto): Promise<string> {
    const name = newProduct.name;
    const findName = await this.productRepository.findOne({ where: { name } });
    if (findName) {
      return 'Existe un producto ya con ese nombre';
    }

    const product = this.productRepository.create(newProduct);
    await this.productRepository.save(product);
    return 'Producto creado con exito';
  }

  async updateProductById(
    id: string,
    productData: Partial<updateProduct>,
  ): Promise<string> {
    const productFind = await this.productRepository.findOne({ where: { id } });
    if (!productFind) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (productData.name) {
      const nameExists = await this.productRepository.findOne({
        where: { name: productData.name },
      });
      if (nameExists && nameExists.id !== id) {
        throw new ConflictException('El nombre del producto ya está en uso');
      }
    }

    try {
      await this.productRepository.update(id, productData);
      return `El producto de ${id} fue actualizado`;
    } catch (err) {
      if (
        err &&
        (err as QueryFailedError).driverError &&
        ((err as QueryFailedError).driverError as any).code === '23505'
      ) {
        throw new ConflictException('Ya existe un producto con ese nombre');
      }
      throw err;
    }
  }

  async deleteProductById(id: string): Promise<string> {
    const productFind = await this.productRepository.findOne({ where: { id } });
    if (!productFind) {
      return 'Producto no encontrado';
    }
    await this.productRepository.delete({ id });
    return 'El producto de id: ' + id + ' ha sido eliminado correctamente';
  }

  async getById(id: string): Promise<Product | string> {
    const productFind = await this.productRepository.findOne({ where: { id } });
    if (productFind) {
      return productFind;
    }
    return 'Producto no encontrado';
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    for (const productData of productsData) {
      const category = categories.find(
        (cat) => cat.name === productData.category,
      );

      if (!category) {
        console.log(
          `Categoría "${productData.category}" no encontrada, saltando producto "${productData.name}".`,
        );
        continue;
      }

      const product = this.productRepository.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: category,
      });

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    }
    return 'Productos agregados o actualizados exitosamente';
  }
}
