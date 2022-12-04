import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { cloneDeep } from 'lodash';
import { config } from './config';

async function generate() {
  const backendHost = process.argv[2];
  if (typeof backendHost !== 'string') {
    throw new Error('Please provide the backend url as the first positional parameter');
  }

  const app = await NestFactory.create(AppModule, {
    logger: false
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.serviceName)
    .setDescription('API for generating colors')
    .setVersion('1.0')
    .addTag('colors')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const documentWithAwsExtensions = addAwsExtensions(document, { 
    backendHost, 
    backendPort: config.port 
  });

  console.log(JSON.stringify(documentWithAwsExtensions));
}

/**
 * Adds AWS-specific data to the openapi spec so AWS gateway works
 *
 * TODO: move this to shared lib?
 */
function addAwsExtensions(document: OpenAPIObject, params: { backendHost: string, backendPort: string|number }) {
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
          "uri" : `${params.backendHost}:${params.backendPort}${pathKey}`,
          "connectionType" : "INTERNET"
        }
      })
    }
  }

  return clonedDocument;
}

generate();
