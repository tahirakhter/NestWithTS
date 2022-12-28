import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { PrismaService } from "../common/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { HelperService } from "../common/helper/helper.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserService,
        HelperService,
        JwtService,
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
