import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type: 'mysql',
              host: 'localhost',
              port: 32769 ,
              database: 'canciones',
              username: 'andres',
              password: '123456',
              synchronize: true,
              dropSchema: false,
              entities: [
                  UsuarioEntity
              ]
          }
      ),UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
