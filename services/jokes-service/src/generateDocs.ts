import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function generate() {
  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const config = new DocumentBuilder()
    .setTitle('Jokes service')
    .setDescription('API for generating jokes')
    .setVersion('1.0')
    .addTag('jokes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  console.log(JSON.stringify(document));
}

generate();
