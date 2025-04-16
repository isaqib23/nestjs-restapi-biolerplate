import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { BaseApiErrorResponse, SwaggerBaseApiResponse } from '../dtos/base-api-response.dto';

export function ApiCommonOperation(summary: string, responseObject: any) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: HttpStatus.OK,
      type: SwaggerBaseApiResponse(responseObject),
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      type: BaseApiErrorResponse,
    }),
  );
}
