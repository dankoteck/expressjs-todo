import argon2 from "argon2";
import prisma from "src/db";
import { UserDTO } from "src/types";
import { createToken } from "src/utils";

export default class AuthService {
  async signup(payload: UserDTO) {
    try {
      const { email, password } = payload;
      const existsUser = await prisma.user.findUnique({ where: { email } });

      if (existsUser) {
        throw "Email is already registered.";
      }

      const hashPassword = await argon2.hash(password);
      const user = await prisma.user.create({
        data: { email, password: hashPassword },
        select: { id: true, email: true },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  async signin(payload: UserDTO) {
    try {
      const { email, password } = payload;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw "Email is not exists.";
      }

      const isValidPassword = await argon2.verify(user.password, password);
      if (!isValidPassword) {
        throw "Wrong password. Try again.";
      }

      const accessToken = createToken({ email }, { expiresIn: "2h" });
      const refreshToken = createToken({ email });

      return { accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }
}
