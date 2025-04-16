import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { UserOutput } from '../dtos/user-output.dto';
import { UserRepository } from '../repositories/user.repository';
import { AppLogger } from '../../../shared/logger/logger.service';
import { RequestContext } from '../../../shared/request-context/request-context.dto';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getUserById(ctx: RequestContext, id: number): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUserById.name} was called`);

    this.logger.log(ctx, `calling ${UserRepository.name}.getById`);
    const user = await this.repository.getById(id);

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    });
  }
}
