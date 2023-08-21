import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../common/database/database.module';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Module({
  controllers: [UserController],
  providers:[UserService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  imports:[DatabaseModule]
})

export class UserModule {}