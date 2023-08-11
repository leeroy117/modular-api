import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
// import { UserService } from './user/user.service';
// import { DatabaseModule } from './database/database.module';

@Module({
    controllers: [AppController],
    imports: [UserModule, AuthModule],
    // providers: [UserService]
})
export class AppModule {

}