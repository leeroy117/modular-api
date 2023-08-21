import { Body, Controller, Post, Req, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/public_access/public_access';
// import { UpdateUserDto } from './user/dto/update-user.dto';


// @ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() request: LoginAuthDto, @Res() response) {
    
    const token = await this.authService.login({ username: request.username, password: request.password });

    return response.status(HttpStatus.OK).json({
      message: 'Inicio de sesión exitoso.',
      token,
      statusCode: HttpStatus.OK
    })

  }
}