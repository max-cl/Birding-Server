import { Module } from '@nestjs/common';
import { BirdController } from './bird.controller';
import { BirdService } from './bird.service';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { BirdSchema } from './schemas/bird.schema';
import { BirdRepository } from './bird.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Bird', schema: BirdSchema }]),
    ],
    controllers: [BirdController],
    providers: [BirdService, BirdRepository],
    exports: [BirdService],
})
export class BirdModule {}
