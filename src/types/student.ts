import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { transformPhone } from "../helper";

export class StudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  program: string;

  @IsString()
  @Transform(transformPhone)
  phone: string;

  createdBy?: number;
}

export interface Student {
  name: string;
  studentId: string;
  program: string;
  phone?: string;
  createdBy?: number;
}
