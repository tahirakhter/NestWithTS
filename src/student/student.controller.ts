import {
  Body,
  Controller,
  Get,
  Request,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { StudentDto } from "../types";
import { StudentService } from "./student.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { RoleType } from "../common/enum/role-type.enum";

@UseGuards(AuthGuard("jwt"))
@Controller("student")
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get("getAllStudents")
  async getAllStudentsByUser() {
    return await this.studentService.getAllStudentsByUser();
  }

  @Get(":id")
  async getById(@Param("id", new ParseIntPipe()) id) {
    return await this.studentService.getById(id);
  }

  @UseGuards(new RolesGuard(RoleType.ADMIN))
  @Post("create")
  async create(
    @Body() studentDto: StudentDto,
    @Request() req
  ): Promise<StudentDto> {
    studentDto.createdBy = req?.user?.userId;
    return await this.studentService.create(studentDto);
  }
}
