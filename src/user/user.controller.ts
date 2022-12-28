import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@UseGuards(AuthGuard("jwt"))
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
