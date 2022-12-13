import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...", {
      RePath: req?.route.path,
      DateTime: new Date(),
    });
    console.log("Response...", {
      StatusCodeode: res?.statusCode,
      DateTime: new Date(),
    });
    next();
  }
}
