import { Types } from 'mongoose';

export class GetUserDTO {
    readonly token: Types.ObjectId;
}

export class CreateUserDTO {
    readonly birdId: Types.ObjectId;
    readonly checked: Boolean;
}

export class UpdateUserDTO {
    readonly token: string;
    readonly birdId: string;
    readonly checked: Boolean;
}
