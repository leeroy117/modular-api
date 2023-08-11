import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../../database/database.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers:[AuthService],
  imports:[DatabaseModule]
})

export class AuthModule {}