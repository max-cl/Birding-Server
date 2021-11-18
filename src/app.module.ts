import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirdModule } from './bird/bird.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PlaceModule } from './place/place.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        BirdModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        MongooseModule.forRoot(process.env.DATABASE_HOST),
        PlaceModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
