//usuario.entity.ts

import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';
import { ComidaEntity } from '../comida/comida.entity';
import { RolEntity } from '../rol/rol.entity';

@Entity('usuario')
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre:string;

  @Column()
  contrasenia:string;

  @Column()
  correo:string;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date'
  })
  fechaNacimiento: Date;

  @OneToMany(
    type => ComidaEntity,  // Que tabla vamos a relacionar
    comida => comida.usuario // Campo que hace referencia FK
  )
  comidas: ComidaEntity[];

  @ManyToMany(type => RolEntity)
  @JoinTable()
  roles: RolEntity[];
}