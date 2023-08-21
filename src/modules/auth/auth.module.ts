import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { DatabaseModule } from '../../common/database/database.module';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers:[AuthService, UserService],
  imports:[DatabaseModule, JwtModule.register({
    global: true,
    secret: '4gColl3g3#2023',
    signOptions: { expiresIn: '1h'}
})]
})

export class AuthModule {}