import { ForbiddenException, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { PrismaService } from "../common/prisma/prisma.service";
import { HelperService } from "../common/helper/helper.service";
import { AuthDto, UserDto } from "../types";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private helperService: HelperService,
    private jwtService: JwtService
  ) {}

  async login(authDto: AuthDto) {
    try {
      const user = await this.userService.fineOne({ email: authDto.email });

      if (
        !user ||
        !(await this.helperService.matchHash(authDto.password, user.password))
      ) {
        throw new ForbiddenException("invalid email or password");
      }

      return {
        access_token: this.jwtService.sign({
          email: user.email,
          sub: user.id,
        }),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(user: UserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          uuid: uuidv4(),
          name: user.name,
          email: user.email,
          password: await this.helperService.generateHash(user.password),
          role: "admin",
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
