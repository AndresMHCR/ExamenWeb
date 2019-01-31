import {Module} from "@nestjs/common";
import {RolxusuarioService} from "./rolxusuario.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import {RolxusuarioEntity} from "./rolxusuario.entity";

@Module({
  imports:[
    TypeOrmModule
      .forFeature([RolxusuarioEntity
      ])
  ],
  providers:[
    RolxusuarioService
  ],
  exports: [
    RolxusuarioService
  ]
})
export class RolxusuarioModule{

}