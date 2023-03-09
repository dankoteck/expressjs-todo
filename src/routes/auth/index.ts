import { Router } from "express";
import AuthController from "./controller";

const router = new (Router as any)();

const auth = new AuthController();

router.post("/signup", auth.signup.bind(auth));

router.post("/signin", auth.signin.bind(auth));

export default router;
