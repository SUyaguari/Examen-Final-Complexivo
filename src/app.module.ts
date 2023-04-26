import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './resources/client/client.module';
import { getEnvPath } from './assets/helpers/env.helpers';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './resources/login/login.module';
const envFilePath: string = getEnvPath(`${__dirname}/../src/assets/environments`);

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: [envFilePath],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ClientModule,
    LoginModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
