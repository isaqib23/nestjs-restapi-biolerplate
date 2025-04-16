import { FastifyRequest as OriginalFastifyRequest } from 'fastify';
import { EntityManager } from 'typeorm';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';

declare module 'fastify' {
  interface FastifyRequest extends OriginalFastifyRequest {
    user: any;
    [ENTITY_MANAGER_KEY]?: EntityManager;
  }
}
