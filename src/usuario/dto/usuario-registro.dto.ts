// usuario-crate.dto.ts

import {IsDate, IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsString, Length} from "class-validator";

export class UsuarioRegistroDto {

    @IsNotEmpty()
    @IsString()
    @Length(3,20)
    nombre:string;

    @IsNotEmpty()
    @IsString()
    @Length(15,30)
    @IsEmail()
    correo:string;

    @IsNotEmpty()
    @IsString()
    password:string;

}