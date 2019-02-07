
import {Injectable} from "@nestjs/common";

import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import { Comida } from '../app.controller';
import { ComidaEntity } from './comida.entity';

@Injectable()
export class ComidaService{

  constructor(
    @InjectRepository(ComidaEntity)
    private readonly _comidaRepository: Repository<ComidaEntity>
  ){}


  buscar(parametrosBusqueda?: FindManyOptions<ComidaEntity>)
    : Promise<ComidaEntity[]> {
    return this._comidaRepository.find(parametrosBusqueda)
  }

  eliminar(idComida: number): Promise<ComidaEntity>{
    const comidaAEliminar: ComidaEntity = this._comidaRepository
      .create({
        id: idComida
      });
    return this._comidaRepository.remove(comidaAEliminar);
  }

  actualizar(comida: Comida): Promise<ComidaEntity> {
    const comidaEntity: ComidaEntity = this._comidaRepository.create(comida);
    return this._comidaRepository.save(comidaEntity)
  }

  buscarPorId(idComida: number): Promise<ComidaEntity>{
    return this._comidaRepository.findOne(idComida);
  }
  crear(comida: Comida): Promise<ComidaEntity> {

    const comidaEntity: ComidaEntity = this._comidaRepository.create(comida);

    return this._comidaRepository.save(comidaEntity)
  }
}