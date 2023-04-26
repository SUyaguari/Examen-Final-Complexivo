import {Logger, ConflictException, HttpException} from '@nestjs/common'

export function handleException(title: string, error: any){

    if( error.code === 11000 ){
        
        Logger.error(` - ${title.toUpperCase()} - duplicate key error: ${error.keyValue}`);
        
        throw new ConflictException(
            `Value ${JSON.stringify(error.keyValue)} already exists!`,
        );
    }
    Logger.error(`- ${title.toUpperCase()} - ${error}`);
    throw new HttpException(
      {
        statusCode: error.status,
        message: `${error.message}`,
        error: `${error.response.error}`,
      },
      error.status,
    );
}