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
import { StudentDto } from "../../types";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { StudentService } from "./student.service";

@UseGuards(JwtAuthGuard)
@Controller("student")
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get("getAllStudents")
  getAllStudentsByUser() {
    return this.studentService.getAllStudentsByUser();
  }

  @Get(":id")
  getById(@Param("id", new ParseIntPipe()) id) {
    return this.studentService.getById(id);
  }

  @Post("create")
  async create(@Body() studentDto: StudentDto, @Request() req) {
    studentDto.createdBy = req?.user?.userId;
    return this.studentService.create(studentDto);
  }
}
