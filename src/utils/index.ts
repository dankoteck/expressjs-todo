import { Request } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export function createToken(
  payload: string | JwtPayload,
  options?: SignOptions
) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, options);
  return token;
}

export function getToken(req: Request) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

export function createResponse200(data: any, customMessage?: string) {
  const res = {
    statusCode: 200,
    message: customMessage || "OK",
    data,
  };
  if (data === null) {
    delete res.data;
  }
  return res;
}

export function createResponse500(err: any, customMessage?: string) {
  return {
    statusCode: 500,
    message: customMessage || "Internal Error",
    error: err,
  };
}
