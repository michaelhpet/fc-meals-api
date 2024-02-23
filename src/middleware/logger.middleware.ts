import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    console.log(`Request to ${req.method} ${req.path} from ${req.ip}`);
    next();
  }
}
