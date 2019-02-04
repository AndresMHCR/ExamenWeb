//usuario.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolxusuarioEntity } from '../RolPorUsuario/rolxusuario.entity';

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

/*
  @OneToMany(
    type => RolxusuarioEntity,  // Que tabla vamos a relacionar
    rolxusuario => rolxusuario.usuario  // Campo que hace referencia FK
  )
  rolxusuario: RolxusuarioEntity[];*/
}