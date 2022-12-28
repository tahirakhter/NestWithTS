import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class RolesGuard implements CanActivate {
  private rolePassed: string;

  constructor(role: string) {
    this.rolePassed = role;
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();
    return this.rolePassed == request.user.role;
  }
}
