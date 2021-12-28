import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import { BirdService } from '../bird/bird.service';
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly birdService: BirdService,
    ) {}

    @Get(':token')
    async getUser(
        @Res() res,
        @Param('token') getUserDTO: GetUserDTO,
    ): Promise<User[]> {
        const data = await this.userService.getUser(getUserDTO);
        if (!data) throw new NotFoundException('User does not exists!');
        return res.status(HttpStatus.OK).json(data);
    }

    @Post()
    async createUser(@Res() res) {
        const birds = await this.birdService.getBirds();
        const createUserDTO: CreateUserDTO[] = birds.map((bird) => ({
            birdId: bird._id,
            checked: false,
        }));

        const user = await this.userService.createUser(createUserDTO);

        const idString = user[0]._id.toString();
        return res.status(HttpStatus.CREATED).json({
            message: 'User has been created.',
            data: <CreateUserDTO>user[0].data.map((d) => ({
                birdId: d.birdId,
                checked: d.checked,
            })),
            token: <GetUserDTO>idString,
        });
    }

    @Put()
    async updateCheckedBird(@Res() res, @Body() updateUserDTO: UpdateUserDTO) {
        console.log({ 'COntroller Update': updateUserDTO });
        const updated = await this.userService.updateCheckedBird(updateUserDTO);
        if (!updated) throw new NotFoundException('Bird does not exists!');
        return res.status(HttpStatus.OK).json({
            message: 'Bird-Checked has updated successfully',
            data: updated,
        });
    }
}
