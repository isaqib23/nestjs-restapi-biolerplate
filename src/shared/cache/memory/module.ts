import { Module } from '@nestjs/common';
import { ICacheAdapter } from '../adapter';
import { MemoryCacheService } from './service';

@Module({
  imports: [],
  providers: [
    {
      provide: ICacheAdapter,
      useFactory: async () => {
        const cacheService = new MemoryCacheService();
        cacheService.connect();
        return cacheService;
      },
      inject: []
    }
  ],
  exports: [ICacheAdapter]
})
export class MemoryCacheModule {}
