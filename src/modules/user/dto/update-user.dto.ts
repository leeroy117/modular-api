import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @ApiProperty({
        description: 'La contraseña del usuario',
    })
    name: string;

    @ApiProperty({
        description: 'La contraseña del usuario',
    })
    @IsEmail()
    email:string;
}