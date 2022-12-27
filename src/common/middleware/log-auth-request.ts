import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LogRequest implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const data = {
      Protocol: req.protocol,
      Host: req.get("host"),
      Url: req.originalUrl,
      Method: req.method,
      DateTime: new Date().toISOString(),
    };
    console.log(
      `Auth Request: ${data.Protocol}://${data.Host}${data.Url} ${data.Method} ${data.DateTime}`
    );
    next();
  }
}
