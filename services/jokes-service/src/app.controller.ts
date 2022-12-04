import { Controller, Get } from '@nestjs/common';

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
}
