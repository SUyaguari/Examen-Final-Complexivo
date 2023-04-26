import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, clientSchema } from './entities/client.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [
    MongooseModule.forFeature([{
      name: Client.name,
      schema: clientSchema
    }])
  ]
})
export class ClientModule {}
