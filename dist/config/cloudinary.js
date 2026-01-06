"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryV2 = exports.CloudinaryProvider = exports.CLOUDINARY = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "CloudinaryV2", { enumerable: true, get: function () { return cloudinary_1.v2; } });
exports.CLOUDINARY = 'CLOUDINARY';
exports.CloudinaryProvider = {
    provide: exports.CLOUDINARY,
    useFactory: () => {
        const config = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
            api_key: process.env.CLOUDINARY_API_KEY ?? '',
            api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
            secure: true,
        };
        cloudinary_1.v2.config(config);
        return config;
    },
};
//# sourceMappingURL=cloudinary.js.map