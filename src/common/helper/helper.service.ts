import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

@Injectable()
export class HelperService {
  async generateHash(password: string) {
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async matchHash(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
}
