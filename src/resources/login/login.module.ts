import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ClientModule } from '../client/client.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [ClientModule]
})
export class LoginModule {}
