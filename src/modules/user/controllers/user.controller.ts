import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseApiErrorResponse,
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '../../../shared/dtos/base-api-response.dto';
import { AppLogger } from '../../../shared/logger/logger.service';
import { ReqContext } from '../../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import { UserOutput } from '../dtos/user-output.dto';
import { UserService } from '../services/user.service';
import { ApiCommonOperation } from '../../../shared/decorators/api-common-operations';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserController.name);
  }

  @Get(':id')
  @ApiCommonOperation('Get user by id API', UserOutput)
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const user = await this.userService.getUserById(ctx, id);
    return { data: user, meta: {} };
  }
}
