import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { VALIDATION_PIPE_OPTIONS } from './shared/constants';
import { RequestIdMiddleware } from './shared/middlewares/request-id/request-id.middleware';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.getHttpAdapter().getInstance().addHook('onRequest', RequestIdMiddleware);
  app.enableCors();

  /** Swagger configuration*/
  const options = new DocumentBuilder()
    .setTitle('Nestjs API starter')
    .setDescription('Nestjs API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port || 3000);
}
bootstrap();
