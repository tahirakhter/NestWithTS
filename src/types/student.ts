import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  name: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  program: string;

  @IsString()
  //@Transform(({ value }) => new Prisma.Decimal(value))
  //@Transform(transformPhone)
  phone: string;

  createdBy?: number;
}
