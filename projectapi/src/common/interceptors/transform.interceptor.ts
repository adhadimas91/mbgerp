import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode || 200;

    return next.handle().pipe(
      map((res) => {
        // If response is already formatted
        if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
          return res;
        }

        return {
          success: true,
          statusCode,
          message: res?.message || 'Permintaan berhasil diproses',
          data: res?.data !== undefined ? res.data : res,
          meta: res?.meta || undefined,
        };
      }),
    );
  }
}
