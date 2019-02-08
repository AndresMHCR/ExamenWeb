import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import { RolEntity } from './rol/rol.entity';
import { RolModule } from './rol/rol.module';
import { ComidaEntity } from './comida/comida.entity';
import { ComidaModule } from './comida/comida.module';
import { IngredienteEntity } from './ingrediente/ingrediente.entity';
import { IngredienteModule } from './ingrediente/ingrediente.module';
import { EventoEntity } from './eventos/evento.entity';
import { EventoModule } from './eventos/evento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 32771 ,
        database: 'comida',
        username: 'andres',
        password: '12345',
        synchronize: true,
        dropSchema: false,
        entities: [
          ComidaEntity,
          IngredienteEntity,
          EventoEntity,
          UsuarioEntity,
          RolEntity
        ]
      }
    ),
    ComidaModule,
    IngredienteModule,
    EventoModule,
    UsuarioModule,
    RolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
