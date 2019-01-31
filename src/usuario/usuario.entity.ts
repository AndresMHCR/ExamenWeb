//usuario.entity.ts

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolxusuarioEntity } from '../RolPorUsuario/rolxusuario.entity';

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

      @Column()
      fecha_nacimiento:Date;

  @OneToMany(
    type => RolxusuarioEntity,  // Que tabla vamos a relacionar
    rolxusuario => rolxusuario.usuario  // Campo que hace referencia FK
  )
  rolxusuario: RolxusuarioEntity[];
}