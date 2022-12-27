import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "./common/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { HelperModule } from "./common/helper/helper.module";
import { DataTransformModule } from "./common/data-transform/data-transform.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthController } from "./auth/auth.controller";
import { LogRequest } from "./common/middleware/log-auth-request";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 2,
    }),
    PrismaModule,
    StudentModule,
    UserModule,
    AuthModule,
    HelperModule,
    DataTransformModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequest).forRoutes(AuthController);
  }
}
