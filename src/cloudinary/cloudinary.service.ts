import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
    public constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }

    public async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const upload_stream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    reject(error);
                } else if (result && result.secure_url) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Upload failed: No secure_url returned from Cloudinary.'));
                }
            });
            upload_stream.end(file.buffer);
        });
    }

    public async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
        const uploadPromises = files.map((file) => this.uploadImage(file));
        return Promise.all(uploadPromises);
    }
}
