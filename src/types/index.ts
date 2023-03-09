import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserDTO {
  email: string;
  password: string;
}

export interface UserRequest extends Request {
  user?: string | JwtPayload;
}
