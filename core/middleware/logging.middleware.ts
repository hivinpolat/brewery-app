import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('LoggingMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    const userAgent = req.get('user-agent') || '';
    this.logger.log(
      `Incoming Request - Method: ${method}, URL: ${originalUrl}, Query: ${JSON.stringify(
        query,
      )}, Body: ${JSON.stringify(body)}, User-Agent: ${userAgent}`,
    );

    next();
  }
}
