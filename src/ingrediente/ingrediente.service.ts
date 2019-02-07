
import {Injectable} from "@nestjs/common";

import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import { Comida, Ingrediente } from '../app.controller';
import { IngredienteEntity } from './ingrediente.entity';
import { ComidaEntity } from '../comida/comida.entity';

@Injectable()
export class IngredienteService{

  constructor(
    @InjectRepository(IngredienteEntity)
    private readonly _ingredienteRepository: Repository<IngredienteEntity>
  ){}


  buscar(parametrosBusqueda?: FindManyOptions<IngredienteEntity>)
    : Promise<IngredienteEntity[]> {
    return this._ingredienteRepository.find(parametrosBusqueda)
  }

  eliminar(idIngrediente: number): Promise<IngredienteEntity>{
    const comidaAEliminar: IngredienteEntity = this._ingredienteRepository
      .create({
        id: idIngrediente
      });
    return this._ingredienteRepository.remove(comidaAEliminar);
  }

  actualizar(ingrediente: Ingrediente): Promise<IngredienteEntity> {
    const ingredienteEntity: IngredienteEntity = this._ingredienteRepository.create(ingrediente);
    return this._ingredienteRepository.save(ingredienteEntity)
  }

  buscarPorId(idIngrediente: number): Promise<IngredienteEntity>{
    return this._ingredienteRepository.findOne(idIngrediente);
  }
  crear(ingrediente: Ingrediente): Promise<IngredienteEntity> {

    const ingredienteEntity: IngredienteEntity = this._ingredienteRepository.create(ingrediente);

    return this._ingredienteRepository.save(ingredienteEntity)
  }

}