import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

export const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(saltOrRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const matchHash = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
