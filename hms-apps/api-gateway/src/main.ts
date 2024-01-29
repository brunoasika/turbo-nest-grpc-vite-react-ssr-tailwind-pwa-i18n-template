/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();


import { NestFactory } from '@nestjs/core';
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

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { join } from 'path';
import * as i18next from 'i18next';
import * as i18nextMiddleware from 'i18next-http-middleware';
import * as Backend from "i18next-fs-backend";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v', 
  });

  const localesPath = join(__dirname, '../../../../', 'api-gateway','src','locales');

  i18next

    .use(i18nextMiddleware.LanguageDetector)
    //@ts-ignore
    .use(Backend)
    .init({
      debug: false,
      preload: ['en', 'en-US', 'fr'],
      ns: ['public', 'adm'],
      defaultNS: 'public',
      backend: {
        loadPath: `${localesPath}/{{lng}}/{{ns}}.json`,
        addPath: `${localesPath}/{{lng}}/{{ns}}.missing.json`,
      }
    }//, (err, t) => {
      // init set content
      //console.log(t);
      //console.log(err);
      // console.log('INIT DONE');}
    );

  //expose the underlying http server
  const httpInstance = app.getHttpAdapter().getInstance();

  httpInstance.use(
    //@ts-ignore
    i18nextMiddleware.handle(i18next, {
      //ignoreRoutes: [], // or function(req, res, options, i18next) // return true to ignore 
      removeLngFromUrl: false // removes the language from the url when language detected in path
    })
  )


  await app.listen(3002);
}
bootstrap();
