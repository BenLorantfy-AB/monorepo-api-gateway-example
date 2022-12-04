import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { cloneDeep } from 'lodash';

async function generate() {
  const backendUrl = process.argv[2];
  if (typeof backendUrl !== 'string') {
    throw new Error('Please provide the backend url as the first positional parameter');
  }

  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const config = new DocumentBuilder()
    .setTitle('jokes-service')
    .setDescription('API for generating jokes')
    .setVersion('1.0')
    .addTag('jokes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const documentWithAwsExtensions = addAwsExtensions(document, backendUrl);
  console.log(JSON.stringify(documentWithAwsExtensions));
}

function addAwsExtensions(document: OpenAPIObject, backendUrl: string) {
  const clonedDocument = cloneDeep(document);
  for (let pathKey in clonedDocument.paths) {
    for (let method in clonedDocument.paths[pathKey]) {
      if (method !== 'get' && method !== 'put') {
        continue;
      }

      const methodDef = clonedDocument.paths[pathKey][method];
      if (!methodDef) {
        continue;
      }

      Object.assign(methodDef, {
        'x-amazon-apigateway-integration': {
          "payloadFormatVersion" : "1.0",
          "type" : "http_proxy",
          "httpMethod" : "ANY",
          "uri" : `${backendUrl}${pathKey}`,
          "connectionType" : "INTERNET"
        }
      })
    }
  }

  return clonedDocument;
}

generate();
