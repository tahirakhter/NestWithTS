import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StudentController } from "./modules/student/student.controller";
import { StudentModule } from "./modules/student/student.module";
import { LoggerMiddleware } from "./middleware/LoggerMiddleware";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserController } from "./modules/user/user.controller";

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(StudentController, UserController);
  }
}
