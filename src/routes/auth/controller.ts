import Ajv, { JSONSchemaType } from "ajv";
import { Request, Response } from "express";
import { UserDTO } from "src/types";

import { createResponse500 } from "src/utils";

import AuthService from "./service";

const ajv = new Ajv();

const schema: JSONSchemaType<UserDTO> = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default class AuthController {
  private authService = new AuthService();

  async signup(req: Request, res: Response) {
    const payload: UserDTO = req.body;

    try {
      if (validate(payload)) {
        const user = await this.authService.signup(payload);
        return res.status(201).json({ statusCode: 200, data: user });
      }
      return res.status(200).json(createResponse500(validate.errors));
    } catch (err) {
      res.status(500).json(createResponse500(err));
    }
  }

  async signin(req: Request, res: Response) {
    const payload: UserDTO = req.body;

    try {
      if (validate(payload)) {
        const tokens = await this.authService.signin(payload);
        return res.status(200).send({ statusCode: 200, data: tokens });
      }
      return res.status(200).json(createResponse500(validate.errors));
    } catch (err) {
      res.status(500).json(createResponse500(err));
    }
  }
}
