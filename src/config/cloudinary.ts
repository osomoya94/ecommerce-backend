import { ConfigOptions, v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';

export const CLOUDINARY = 'CLOUDINARY';

export const CloudinaryProvider: Provider<ConfigOptions> = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    const config: ConfigOptions = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
      api_key: process.env.CLOUDINARY_API_KEY ?? '',
      api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
      secure: true,
    };

    cloudinary.config(config);
    return config;
  },
};

export { cloudinary as CloudinaryV2 };
