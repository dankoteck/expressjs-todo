import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createResponse500, getToken } from "src/utils";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req);

  if (token) {
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET as string);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (err) {
      return res.status(500).json(createResponse500(err));
    }
  }
  return res.status(500).json(createResponse500("Token was not found !"));
}
