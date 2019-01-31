import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolxusuarioEntity } from '../RolPorUsuario/rolxusuario.entity';

@Entity('rol')
export class RolEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre:string;

  @OneToMany(
    type => RolxusuarioEntity,  // Que tabla vamos a relacionar
    rolxusuario => rolxusuario.rol  // Campo que hace referencia FK
  )
  rolxusuario: RolxusuarioEntity[];

}