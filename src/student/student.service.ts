import { Injectable } from "@nestjs/common";
import { StudentDto } from "../types";
import { PrismaService } from "../common/prisma/prisma.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(student: StudentDto): Promise<StudentDto> {
    try {
      return await this.prisma.student.create({
        data: {
          uuid: uuidv4(),
          name: student.name,
          studentId: student.studentId,
          program: student.program,
          phone: student.phone,
          createdBy: student.createdBy,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id: number) {
    try {
      const student = await this.prisma.student.findUnique({
        where: {
          id: id,
        },
      });
      return student ? student : "nothing found";
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllStudentsByUser() {
    try {
      return await this.prisma.student.findMany({
        select: {
          name: true,
          studentId: true,
          program: true,
          phone: true,
        },
        where: {
          user: {
            email: {
              contains: "@gmail",
            },
          },
        },
        orderBy: {
          studentId: "asc",
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
