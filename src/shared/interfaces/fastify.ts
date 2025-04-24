import { EntityManager } from 'typeorm';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';

declare module 'fastify' {
  interface FastifyRequest {
    user: any;
    [ENTITY_MANAGER_KEY]?: EntityManager;
  }
}