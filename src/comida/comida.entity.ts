//usuario.entity.ts

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('comida')
export class ComidaEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombrePlato: string;

  @Column()
  descripcionPlato: string;

  @Column()
  nacionalidad: string;

  @Column()
  numeroPersonas: number;

  @Column()
  picante: boolean;


  @OneToMany(
    type => IngredienteEntity,  // Que tabla vamos a relacionar
    ingrediente => ingrediente.comida // Campo que hace referencia FK
  )
  ingredientes: IngredienteEntity[];

  @ManyToOne(
    type => UsuarioEntity,  // Tipo tabla
    usuario => usuario.comidas
  )
  usuario: UsuarioEntity;
}