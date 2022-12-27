import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const data = {
    Protocol: req.protocol,
    Host: req.get("host"),
    Url: req.originalUrl,
    Method: req.method,
    DateTime: new Date().toISOString(),
  };
  console.log(
    `${data.Protocol}://${data.Host}${data.Url} ${data.Method} ${data.DateTime}`
  );
  next();
}
