import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();


/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  // Serve static files from the build directory
  app.useStaticAssets(join(__dirname, '..', 'users-demo-frontend', 'build'), {
    prefix: '/v1/view-users',
  });

  await app.listen(3002);
}
bootstrap();
*/
