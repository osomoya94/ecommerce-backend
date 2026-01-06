import { ConfigOptions, v2 as cloudinary } from 'cloudinary';
import { Provider } from '@nestjs/common';
export declare const CLOUDINARY = "CLOUDINARY";
export declare const CloudinaryProvider: Provider<ConfigOptions>;
export { cloudinary as CloudinaryV2 };
