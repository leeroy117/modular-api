import { Controller, Get, Param, Post, Patch, Req, Delete, Query, Ip, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.get();
  }
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUser(userId);
  }
  @Post()
  store(@Req() req: Request) {
    return this.userService.create(req);
  }
  @Patch('/:userId')
  update(@Body() updateUserDto: UpdateUserDto, @Param() param: { userId: number }) {
    return this.userService.update(updateUserDto, param);
  }
  @Delete('/:userId')
  delete(@Param() param: { userId: number }) {
    return this.userService.delete(param);
  }
}