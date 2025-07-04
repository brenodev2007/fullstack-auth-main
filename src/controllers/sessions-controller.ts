import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/AuthConfig/auth";
import { sign } from "jsonwebtoken";
const fakeUser = {
  id: 1,
  username: "rodrigo",
  password: "123456",
};

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;
    if (username !== fakeUser.username && password !== fakeUser.password) {
      throw new AppError("Invalid credentials");
    }

    const { secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: fakeUser.username,
    });

    return response.status(200).json({ token }); //retorna o token do usuário
  }
}

export { SessionsController };
