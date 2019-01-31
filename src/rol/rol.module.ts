import {Module} from "@nestjs/common";
import {RolService} from "./rol.service";
import {TypeOrmModule} from '@nestjs/typeorm'
import {RolEntity} from "./rol.entity";

@Module({
  imports:[
    TypeOrmModule
      .forFeature([RolEntity
      ])
  ],
  providers:[
    RolService
  ],
  exports: [
    RolService
  ]
})
export class RolModule{

}