import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";
import { PrismaService } from "../common/prisma/prisma.service";


@UseGuards(AuthGuard("jwt"))
@Controller("user")
export class UserController {
  constructor(private userService: UserService, private prisma: PrismaService) {}

  @Get("getAllStudents")
  getAllStudentsByUser() {
    try {
    return this.userService.getAllStudentsByUser();
  } catch (e) {
    throw new Error(e);
  }
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    try{
    return this.userService.getById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get("getAllStudents")
  getAllStudentsByUser2() {
    try {
      const student = await this.prisma.user.findMany({
        select: {
          name: true,
          email: true,
          student: {
            select: {
              name: true,
              studentId: true,
              program: true,
              phone: true,
            },
          },
        },
        orderBy: {
          name: "desc",
        },
      });
      return student;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
