import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return { status: 'healthy' }
  }

  @Get('/health')
  getHealth() {
    return { status: 'still healthy' }
  }

  @Get('/joke')
  getJoke() {
    return { message: 'knock knock?' }
  }

  @Get('/health/:param')
  getHealth2(@Param() params: { param: string }) {
    return { status: 'still healthy, ' + params.param }
  }
}
