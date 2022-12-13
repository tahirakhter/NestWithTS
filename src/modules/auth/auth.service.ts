import { ForbiddenException, Injectable } from "@nestjs/common";
import { generateHash, matchHash } from "../../helper";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "../../types/auth";
import { UserDto } from "../../types/user";
import { PrismaService } from "../prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(authDto: AuthDto) {
    try {
      const user = await this.userService.fineOne({ email: authDto.email });

      if (!user || !(await matchHash(authDto.password, user.password))) {
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
      const response = await this.prisma.user.create({
        data: {
          uuid: uuidv4(),
          name: user.name,
          email: user.email,
          password: await generateHash(user.password),
          role: "admin",
        },
      });
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
