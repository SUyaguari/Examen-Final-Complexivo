import { Injectable, NotFoundException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { ClientService } from '../client/client.service';
import { handleException } from 'src/assets/utils/handle-exception';
import * as bcrypt from 'bcrypt';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class LoginService {


  constructor(private readonly client: ClientService){}

  async create(createLoginDto: CreateLoginDto) {

    try {

      const u: Client = await this.client.findByEmail(createLoginDto.email);
      
      if(!u){
        throw new NotFoundException(`User ${createLoginDto.email} not found`);
      }
      
      if( !bcrypt.compareSync(createLoginDto.password, u.password ))
        throw new UnauthorizedException(`Invalid credentials!`)
      
        return {
          statusCode: HttpStatus.OK,
          message: `Login successful`,
          u,
        };

    } catch (error) {

      handleException("Login", error);

    }

  }

 
}
