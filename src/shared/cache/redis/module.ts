import { Module } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ICacheAdapter } from '../adapter';
import { RedisService } from './service';
import { AppLoggerModule } from '../../logger/logger.module';
import { AppLogger } from '../../logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AppLoggerModule, ConfigModule],
  providers: [
    {
      provide: ICacheAdapter,
      useFactory: async (configService: ConfigService, logger: AppLogger) => {
        const client = createClient({ url: configService.get('redis.url') }) as RedisClientType;
        const cacheService = new RedisService(logger, client);
        await cacheService.connect();
        return cacheService;
      },
      inject: [ConfigService, AppLogger]
    }
  ],
  exports: [ICacheAdapter]
})
export class RedisCacheModule {}
