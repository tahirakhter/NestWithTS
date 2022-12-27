import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cors from "cors";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/handler/http-exception-filter";
import { logger } from "./common/middleware/req-logger";
import { PrismaService } from "./common/prisma/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet(), logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
