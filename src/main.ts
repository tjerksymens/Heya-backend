import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const corsOptions: CorsOptions = {
        origin: ['http://localhost:5173', 'https://www.heya.me'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Authorization,Content-Type',
        credentials: true,
    };

    app.enableCors(corsOptions);

    await app.listen(3000);
}
bootstrap();
