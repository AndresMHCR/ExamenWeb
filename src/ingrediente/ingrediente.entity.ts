//usuario.entity.ts

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComidaEntity } from '../comida/comida.entity';
import { EventoEntity } from '../eventos/evento.entity';

@Entity('ingrediente')
export class IngredienteEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreIngrediente:string;

  @Column()
  cantidad:number;

  @Column()
  descripcionPreparacion:string;

  @Column()
  opcional:boolean;

  @Column()
  tipoIngrediente:string;

  @Column()
  necesitaRefrigeracion:boolean;

  @ManyToOne(
    type => ComidaEntity,  // Tipo tabla
    comida => comida.ingredientes
  )
  comida: ComidaEntity;

  @ManyToMany(type => EventoEntity, evento => evento.ingredientes)
  eventos: EventoEntity[];


}