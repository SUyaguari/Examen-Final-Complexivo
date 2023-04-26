import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const logger = new Logger('examen final');
  
  logger.log(process.env.MONGO_URL);

  await app.listen(3000);
  logger.log(' ===========================================================')
  logger.log(`Application has started in [${process.env.NODE_ENV}] Mode `);
  logger.log(`Application is listening on [${process.env.PORT}] Port `);
  logger.log(' ===========================================================')
}
bootstrap();
