import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { FileUploadRepository } from './files.repository';
export declare class FilesService {
    private readonly fileUploadRepository;
    private readonly productRepository;
    constructor(fileUploadRepository: FileUploadRepository, productRepository: Repository<Product>);
    uploadProductImage(productId: string, file: Express.Multer.File): Promise<Product>;
}
