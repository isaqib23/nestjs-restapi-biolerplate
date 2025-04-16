import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, concatMap, finalize, Observable } from 'rxjs';
import { DataSource } from 'typeorm';
import { FastifyRequest } from 'fastify';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // get request object
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    // start transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // attach query manager with transaction to the request
    // @ts-ignore
    req[ENTITY_MANAGER_KEY] = queryRunner.manager;

    return next.handle().pipe(
      // concatMap gets called when route handler completes successfully
      concatMap(async (data) => {
        await queryRunner.commitTransaction();
        return data;
      }),
      // catchError gets called when route handler throws an exception
      catchError(async (e) => {
        await queryRunner.rollbackTransaction();
        throw e;
      }),
      // always executed, even if catchError method throws an exception
      finalize(async () => {
        await queryRunner.release();
      }),
    );
  }
}
