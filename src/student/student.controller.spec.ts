import { Test, TestingModule } from "@nestjs/testing";
import { StudentController } from "./student.controller";
import { PrismaService } from "../common/prisma/prisma.service";
import { StudentService } from "./student.service";

describe("StudentController", () => {
  let controller: StudentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, StudentService],
      controllers: [StudentController],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
