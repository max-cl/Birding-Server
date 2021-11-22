import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.use(helmet());

    const config = new DocumentBuilder()
        .setTitle('Canary Islands Birds MobileApp')
        .setDescription("The Canary Islands Birds API's")
        .setVersion('1.0')
        .addTag('Mobile App')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT, () =>
        console.log(`Server listening on port: ${process.env.PORT}`),
    );
}
bootstrap();
