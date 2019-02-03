//usuario.service.ts

import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import { Usuario } from '../app.controller';

@Injectable()
export class UsuarioService{
  arreglo: Usuario [] = [
    {
      nombre: 'andres',
      correo: 'asadadas',
      fecha_nacimiento: 'asdasdasda'
    },
    {
      nombre: 'luis',
      correo: 'asadadas',
      fecha_nacimiento: 'asdasdasda'
    }
  ];
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>
  ){}

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

  buscar(parametrosBusqueda?: FindManyOptions<UsuarioEntity>)
    : Promise<UsuarioEntity[]> {
    return this._usuarioRepository.find(parametrosBusqueda)
  }

  eliminar(idUsuario: number): Promise<UsuarioEntity>{
    const usuarioAEliminar: UsuarioEntity = this._usuarioRepository
      .create({
        id: idUsuario
      });
    return this._usuarioRepository.remove(usuarioAEliminar);
  }

  actualizar(usuario: Usuario): Promise<UsuarioEntity> {
    const usuarioEntity: UsuarioEntity = this._usuarioRepository.create(usuario);
    return this._usuarioRepository.save(usuarioEntity)
  }

  buscarPorId(idNoticia: number): Promise<UsuarioEntity>{
    return this._usuarioRepository.findOne(idNoticia);
  }
}