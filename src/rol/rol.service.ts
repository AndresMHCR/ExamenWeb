import {Injectable} from "@nestjs/common";
import {RolEntity} from "./rol.entity";
import {FindOneOptions, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolEntity)
    private readonly _rolRepository:
      Repository<RolEntity>
  ) {
  }
}