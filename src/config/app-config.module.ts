import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`env/.env.default`],
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
