import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [SharedModule, UserModule],
})
export class AppModule {}
