import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirdModule } from 'src/bird/bird.module';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        BirdModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
