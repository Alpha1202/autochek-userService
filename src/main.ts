import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { join } from 'path';


const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app', //                                 <-- add this
    protoPath: join(__dirname, '../src/app.proto'),
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);

  app.listen(() => {
    Logger.log('User microservice running...')
  });
 
}
bootstrap();
