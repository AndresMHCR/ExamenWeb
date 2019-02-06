//usuario.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolxusuarioEntity } from '../RolPorUsuario/rolxusuario.entity';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';
import { ComidaEntity } from '../comida/comida.entity';

@Entity('usuario')
export class UsuarioEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre:string;

  @Column()
  contraseña:string;

  @Column()
  correo:string;

  @Column({
    name: 'fecha_nacimiento',
    type: "date"
  })
  fechaNacimiento: Date;

  @OneToMany(
    type => ComidaEntity,  // Que tabla vamos a relacionar
    comida => comida.usuario // Campo que hace referencia FK
  )
  comidas: ComidaEntity[];


  @OneToMany(
    type => RolxusuarioEntity,  // Que tabla vamos a relacionar
    rolxusuario => rolxusuario.usuario  // Campo que hace referencia FK
  )
  rolesxusuario: RolxusuarioEntity[];


}