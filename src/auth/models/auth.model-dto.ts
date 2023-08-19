import {ApiOperation, ApiProperty} from "@nestjs/swagger";

export class UserModel {
    @ApiProperty({
        type: String,
        description: 'Username',
        example: 'Hivin',
    })
    username: string;

       @ApiProperty({
        type: String,
        description: 'Password',
        example: '12345',
    })
    password: string;
}