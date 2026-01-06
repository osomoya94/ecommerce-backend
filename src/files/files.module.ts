import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileUploadRepository } from './files.repository';
import { CloudinaryProvider } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, FileUploadRepository, CloudinaryProvider],
})
export class FilesModule {}
