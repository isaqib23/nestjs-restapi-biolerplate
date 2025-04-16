import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { FastifyRequest } from 'fastify';
import { ENTITY_MANAGER_KEY } from '../interfaces/fastify';

export class BaseRepository {
  constructor(
    private dataSource: DataSource,
    private request: FastifyRequest,
  ) {}

  protected getRepository<T extends ObjectLiteral>(
    entityClass: EntityTarget<T>
  ): Repository<T> {
    const entityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository<T>(entityClass);
  }
}