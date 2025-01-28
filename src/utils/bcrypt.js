import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const hashPassword = (password) => hashSync(password, genSaltSync(6));

export const comparePassword = (password, hash) => compareSync(password, hash);
