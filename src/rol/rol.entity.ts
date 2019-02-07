import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventoEntity } from '../eventos/evento.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
@Entity('rol')
export class RolEntity{

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre:string;


}