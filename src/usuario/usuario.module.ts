import {Module} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsuarioEntity} from "./usuario.entity";
import { UsuarioController } from './usuario.controller';
import { RolService } from '../rol/rol.service';
import { RolEntity } from '../rol/rol.entity';

@Module({
    imports:[
        TypeOrmModule
            .forFeature([UsuarioEntity,
              RolEntity
            ])
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService,
      RolService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule{

}