//usuario.service.ts

import {Injectable} from "@nestjs/common";
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import { Comida, Evento, Ingrediente, Usuario } from '../app.controller';
import { EventoEntity } from './evento.entity';
import { ComidaEntity } from '../comida/comida.entity';

@Injectable()
export class EventoService{

  constructor(
    @InjectRepository(EventoEntity)
    private readonly _eventoRepository: Repository<EventoEntity>
  ){}

  buscar(parametrosBusqueda?: FindManyOptions<EventoEntity>)
    : Promise<EventoEntity[]> {
    return this._eventoRepository.find(parametrosBusqueda)
  }

  eliminar(idEvento: number): Promise<EventoEntity>{
    const eventoAEliminar: EventoEntity = this._eventoRepository
      .create({
        id: idEvento
      });
    return this._eventoRepository.remove(eventoAEliminar);
  }

  actualizar(evento: Evento): Promise<EventoEntity> {
    const eventoEntity: EventoEntity = this._eventoRepository.create(evento);
    return this._eventoRepository.save(eventoEntity)
  }

  buscarPorId(idEvento: number): Promise<EventoEntity>{
    return this._eventoRepository.findOne(idEvento,{relations: ['ingredientes']});
  }

  crear(evento: Evento): Promise<EventoEntity> {

    const eventoEntity: EventoEntity = this._eventoRepository.create(evento);

    return this._eventoRepository.save(eventoEntity)
  }



}