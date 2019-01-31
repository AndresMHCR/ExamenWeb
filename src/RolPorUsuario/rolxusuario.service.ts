import {Injectable} from "@nestjs/common";
import {RolxusuarioEntity} from "./rolxusuario.entity";
import {FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RolxusuarioService {
  constructor(
    @InjectRepository(RolxusuarioEntity)
    private readonly _rolxusuarioRepository:
      Repository<RolxusuarioEntity>
  ) {
  }
}