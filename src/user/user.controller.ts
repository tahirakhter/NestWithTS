import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("getAllStudents")
  getAllStudentsByUser() {
    return this.userService.getAllStudentsByUser();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }
}
