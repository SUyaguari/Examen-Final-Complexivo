import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { FilterClientDto } from './dto/filter-client.dto';
import type { Response } from 'express'; 


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(@Query() findAllClientDto: FilterClientDto) {
    return this.clientService.findAll(findAllClientDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }

  @Get('/pdf')
  async generatePdf(@Res() res: Response){

    const bufferPromise = await this.clientService.generatePdf();
    
    const bufferPDF: Buffer = await bufferPromise;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Orden_de_pedido.pdf',
      'Content-Length': bufferPDF.length,
    });

    res.end(bufferPDF);

  }
}
