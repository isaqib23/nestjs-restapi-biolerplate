import { plainToClass } from 'class-transformer';
import { FastifyRequest } from 'fastify';

import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from '../../constants';
import { RequestContext } from '../request-context.dto';
import { UserAccessTokenClaims } from '../../dtos/auth-token-output.dto';

/**
 * Creates a RequestContext object from a Fastify Request
 * @param request The Fastify request object
 * @returns A populated RequestContext instance
 */
export function createRequestContext(request: FastifyRequest): RequestContext {
  const ctx = new RequestContext();

  // Extract headers safely, handling potential undefined values
  const requestId = request.headers[REQUEST_ID_TOKEN_HEADER.toLowerCase()];
  const forwardedFor = request.headers[FORWARDED_FOR_TOKEN_HEADER.toLowerCase()];

  ctx.requestID = Array.isArray(requestId) ? requestId[0] : requestId as string;
  ctx.url = request.url;
  ctx.ip = forwardedFor
    ? (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor as string)
    : request.ip;

  // If request.user does not exist, we explicitly set it to null
  ctx.user = request.user
    ? plainToClass(UserAccessTokenClaims, request.user, {
      excludeExtraneousValues: true,
    })
    : null;

  return ctx;
}