import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolEntity } from '../rol/rol.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('rolxUsuario')
export class RolxusuarioEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(
    type => RolEntity,  // Tipo tabla
    rol => rol.rolxusuario
  )
  rol: RolEntity;

  @ManyToOne(
    type => UsuarioEntity,  // Tipo tabla
    usuario => usuario.rolxusuario
  )
  usuario: UsuarioEntity;

}