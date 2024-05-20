import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
}
