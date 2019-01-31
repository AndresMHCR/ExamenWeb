import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    await app.listen(2000);
}
bootstrap();
