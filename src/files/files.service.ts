import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { FileUploadRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadProductImage(
    productId: string,
    file: Express.Multer.File,
  ): Promise<Product> {
    const response = await this.fileUploadRepository.uploadImage(file);

    if (!response.secure_url) {
      // Por qué: corta temprano si Cloudinary no devolvió URL segura.
      throw new NotFoundException('Error al cargar imagen en Cloudinary');
    }

    await this.productRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    const updated = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!updated) {
      throw new NotFoundException('Producto no encontrado tras actualizar');
    }

    return updated;
  }
}
