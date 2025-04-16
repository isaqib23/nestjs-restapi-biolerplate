import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserAclService } from './services/user-acl.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [UserService, UserAclService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
