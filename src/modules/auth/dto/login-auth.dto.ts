import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
    @IsNotEmpty({message(validationArguments) {
        return `${validationArguments.property} es necesario.`;
    },})
    @IsString({message(validationArguments) {
        return `${validationArguments.property} debe ser una cadena de texto.`;
    }})
    @ApiProperty({
        description: 'Es el usuario del sistema para iniciar sesión.',
        type: String
    })
    username: string;

    @IsNotEmpty({message(validationArguments) {
        return `${validationArguments.property} es necesario.`;
    },})
    @IsString({message(validationArguments) {
        return `${validationArguments.property} debe ser una cadena de texto.`;
    }})
    @ApiProperty({
        description: 'La contraseña del usuario',
    })
    password:string;
}