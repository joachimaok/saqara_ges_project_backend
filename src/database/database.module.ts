import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/app-config.module';

@Module({
  imports: [AppConfigModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
