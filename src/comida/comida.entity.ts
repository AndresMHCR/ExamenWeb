//usuario.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolxusuarioEntity } from '../RolPorUsuario/rolxusuario.entity';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';

@Entity('comida')
export class ComidaEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombrePlato:string;

  @Column()
  descripcionPlato:string;

  @Column()
  nacionalidad:string;

  @Column()
  numeroPersonas:number;

  @Column()
  picante:boolean;


  @OneToMany(
    type => IngredienteEntity,  // Que tabla vamos a relacionar
    ingrediente => ingrediente.comida // Campo que hace referencia FK
  )
  ingredientes: IngredienteEntity[];
}