import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { AuthDto } from "../../types";
import { UserDto } from "../../types";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("login")
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post("create")
  async create(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.authService.create(userDto);
  }
}
