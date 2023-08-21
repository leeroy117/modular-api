import { Controller, Get, Param, Post, Patch, Req, Delete, Query, Ip, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Public } from 'src/common/public_access/public_access';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(AuthGuard)
  // @Public()
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