import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'sst_faculty',
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}