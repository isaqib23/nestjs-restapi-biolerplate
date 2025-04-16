import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4, validate } from 'uuid';

import { REQUEST_ID_TOKEN_HEADER } from '../../constants';

export const RequestIdMiddleware = (
  req: FastifyRequest,
  res: FastifyReply,
  next: () => void,
): void => {
  /** set request id, if not being set yet */
  const requestIdToken = req.headers[REQUEST_ID_TOKEN_HEADER.toLowerCase()] as string || '';

  if (!requestIdToken || !validate(requestIdToken)) {
    req.headers[REQUEST_ID_TOKEN_HEADER] = uuidv4();
  }

  /** set res id in response from req */
  res.header(REQUEST_ID_TOKEN_HEADER, requestIdToken);
  next();
};