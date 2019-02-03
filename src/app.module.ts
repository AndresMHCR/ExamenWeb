import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import { RolEntity } from './rol/rol.entity';
import { RolModule } from './rol/rol.module';
import { RolxusuarioEntity } from './RolPorUsuario/rolxusuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 32769 ,
        database: 'comida',
        username: 'andres',
        password: '12345',
        synchronize: true,
        dropSchema: false,
        entities: [
          UsuarioEntity,
          RolEntity,
          RolxusuarioEntity
        ]
      }
    ),
    UsuarioModule,
    RolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
