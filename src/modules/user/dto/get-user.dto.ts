import { IsEmail, IsInt, IsString } from 'class-validator';

export class GetUserDto {
   
    id: number;

    id_persona: number;

    username: string;

    password?: string;

    nombre: string;

    apellidop: string;

    apellidom: string;

    id_permiso: number;

    id_area: number;

    correo_electronico: string;

    estatus: string;

    fecha_nacimiento: string;

    fecha_alta: string;

    id_corporacion: number;

    bio: string;

    admin_academica: number;

    url_img: string;

    token_password: string;
}