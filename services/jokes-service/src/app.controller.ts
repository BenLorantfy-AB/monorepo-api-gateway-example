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

  @Get('/joke2')
  getJoke2() {
    return { message: 'who is there?' }
  }

  @Get('/joke3')
  getJoke3() {
    return { message: 'orange' }
  }

  @Get('/jokes/:id')
  getHealth2(@Param() params: { param: string }) {
    return { status: `Could not find joke with ID = ${params.param}` }
  }
}
