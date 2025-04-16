import { UserAccessTokenClaims } from '../dtos/auth-token-output.dto';

export class RequestContext {
  public requestID: string | undefined;

  public url: string;

  public ip: string | undefined;

  public user: UserAccessTokenClaims | null;
}
