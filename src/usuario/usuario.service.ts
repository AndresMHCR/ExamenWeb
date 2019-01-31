//usuario.service.ts

import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ){
    }

    async autenticar(username: string,
                     password: string ):Promise<boolean>{
        const consulta: FindOneOptions<UsuarioEntity> = {
            where:{
                username: username,
                password: password
            }
        };
        const respuesta = await this._usuarioRepository.findOne(consulta);
        if(respuesta){
            return true;
        }else {
            return false;
        }
    }
}