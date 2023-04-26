import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './entities/client.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { handleException } from 'src/assets/utils/handle-exception';
import { FilterClientDto } from './dto/filter-client.dto';
import { paginateData } from 'src/assets/utils/pagination';

@Injectable()
export class ClientService {

  constructor(@InjectModel(Client.name) private readonly clientModel: Model<Client>){}

  async create(createClientDto: CreateClientDto) {
    
    try {

      const { password, ...userData } = createClientDto;

      let client; 
      
      if(password){
        
        client = await this.clientModel.create({ 

          ...userData,
          password: bcrypt.hashSync(password, 10)
  
        });
      }else{

        client = await this.clientModel.create(createClientDto);

      }
      
      return {

        statusCode: HttpStatus.OK,
        message: `Client created succesfully`,
        client
    
      };

    } catch (error) {

      handleException("Create Client",error);
    
    }
    
  }

  async findAll(filterUserDto: FilterClientDto) {
    
    try {
      
      const { itemsPage = 10, page = 1, word = ''} = filterUserDto;

      let filter = {};

      if(word.trim()){
        let regex = new RegExp(`.*${word}.*`, 'gi');
        filter = {
          $and: [
            {
              $or: [
                { "ci": regex },
                { "firstName": regex },
                { "lastName": regex },
                { 'email': regex}
              ]
            }
          ],
        }
      } else {
        filter = {}
      }

      let total = await this.clientModel.countDocuments(filter);

      let pagination = paginateData(page, itemsPage, total)

      let client = await this.clientModel.find(filter).skip(pagination.skip).limit(pagination.itemsPage);

      delete pagination.skip;

      return {
        "statusCode": HttpStatus.OK,
        pagination,
        client
      };

    } catch (error) {
      
      handleException('User find all ',error);

    }

    return await this.clientModel.find();

  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {

      const client = await this.clientModel.findByIdAndUpdate(id, updateClientDto, {new:true});

      if (!client) throw new NotFoundException(`The CLient ${id} was not found`);

      return {
        
        statusCode: HttpStatus.OK,
        message: `CLient update succesfully`,
        client,
      
      };

    } catch (error) {
      
      handleException("Update Client", error);

    }
  }

  async remove(id: string) {
    
    try {
      
      const client = await this.clientModel.findByIdAndDelete(id);

      if (!client) throw new NotFoundException(`The Client ${id} was not found`);

      return {
          
        statusCode: HttpStatus.OK,
        message: `Client Delete succesfully`,
        client
      
      };
      
    } catch (error) {
      
      handleException("Delete client", error);
      
    }

  }
}
