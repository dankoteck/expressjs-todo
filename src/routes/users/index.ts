import prisma from "../../db";
import { Request, Response, Router } from "express";

const router = new (Router as any)();

router.get("/", async function (req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true },
    });
    return res
      .status(200)
      .json({ statusCode: 200, message: "OK", data: users });
  } catch (err) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Internal Code", error: err });
  }
});

export default router;
