import { Controller, Get, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { Public } from "./common/public_access/public_access";

@Controller({})
export class AppController{

    // @Injectable()
    // @Public()
    @HttpCode(HttpStatus.OK)
    @Get()
    get() {
      const json = {
        statusCode: HttpStatus.OK,
        message: 'You are logged:D'
      }
      return json;
      // return 'hola';
    }
}