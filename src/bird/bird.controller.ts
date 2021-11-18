import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { BirdService } from './bird.service';
import { CreateBirdDTO } from './dto/bird.dto';
import { Bird } from './interfaces/bird.interface';

@Controller('bird')
export class BirdController {
    constructor(private readonly birdService: BirdService) {}

    @Get()
    async getBirds(@Res() res): Promise<Bird[]> {
        const birds = await this.birdService.getBirds();
        return res.status(HttpStatus.OK).json(birds);
    }

    @Post()
    async createBird(@Res() res, @Body() createBirdDTO: CreateBirdDTO) {
        const bird = await this.birdService.createBird(createBirdDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'Bird has been created.',
            data: bird,
        });
    }
}
