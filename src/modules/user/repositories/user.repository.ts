import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { BaseRepository } from '../../../shared/base-respositrory/base-repository';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: FastifyRequest) {
    super(dataSource, req);
  }

  async getById(id: number): Promise<User> {
    const user = await this.getRepository(User).findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
