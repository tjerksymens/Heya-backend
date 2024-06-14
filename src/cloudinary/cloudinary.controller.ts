import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload')
export class UploadController {
    public constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    public async uploadImage(@UploadedFile() file: Express.Multer.File) {
        const imageUrl = await this.cloudinaryService.uploadImage(file);
        return { imageUrl };
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('images', 10))
    public async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const uploadUrls = await this.cloudinaryService.uploadImages(files);
            return { uploadUrls };
        } catch (error: any) {
            throw new Error(`Failed to upload images: ${error.message}`);
        }
    }
}
