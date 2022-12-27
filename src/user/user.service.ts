import { Injectable } from "@nestjs/common";
import { User } from "../types";
import { PrismaService } from "../common/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async fineOne(user: User) {
    try {
      const response = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id: number) {
    try {
      const response = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllStudentsByUser() {
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
      throw new Error(e);
    }
  }
}
