//usuario.entity.ts

import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';

@Entity('evento')
export class EventoEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreEvento:string;

  @Column({
    name: 'fecha_evento',
    type: "date"
  })
  fechaEvento: Date;

  @Column()
  latitud:string;

  @Column()
  longitud:string;

  @ManyToMany(type => IngredienteEntity)
  @JoinTable({
    name: "eventoPorIngredientes", // table name for the junction table of this relation
    joinColumn: {
      name: "evento",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "ingrediente",
      referencedColumnName: "id"
    }
  })
  ingredientes:IngredienteEntity[];


}