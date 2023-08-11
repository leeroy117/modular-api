import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
// import { UpdateUserDto } from './user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Req() req: Request) {
    console.log('rquest_auth', req);
    
    // return this.userService.create(req);
    // this.authService.login();
  }
}