import {Injectable} from "@nestjs/common";
import {RolEntity} from "./rol.entity";
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly _rolRepository:
      Repository<RolEntity>
  ) {}

  buscar(parametros?: FindManyOptions): Promise<RolEntity[]>{
    return this._rolRepository.find(parametros)
  }
  buscarPorId(id: number): Promise<RolEntity> {
    return this._rolRepository.findOne(id );
  }
}