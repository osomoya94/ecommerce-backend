import { FilesService } from './files.service';
import { Product } from 'src/products/products.entity';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadProductImage(id: string, file: Express.Multer.File): Promise<Product>;
}
