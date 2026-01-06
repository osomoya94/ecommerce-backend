import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error || !result) {
            // Por qué: ESLint exige siempre una instancia de Error al rechazar.
            const reason =
              error instanceof Error
                ? error
                : new Error(
                    typeof error === 'string'
                      ? error
                      : 'Error al cargar imagen en Cloudinary',
                  );
            reject(reason);
            return;
          }
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
