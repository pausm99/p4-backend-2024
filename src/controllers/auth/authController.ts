import type { Request, Response } from "express";
import { catchErrors } from "../../handlers/errors";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/db";
import { send } from "../../handlers/response";
import { env } from "../../utils/env";

const JWT_SECRET_KEY = env("JWT_SECRET_KEY");

const userBodySchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un dígito, y debe tener una longitud mínima de 8 caracteres.",
    }),
});

export class AuthController {
  login = catchErrors(async (req: Request, res: Response) => {
    const { email, password } = userBodySchema.parse(req.body);

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return send(res).unauthorized();
    }

    const hashedPassword = user.password;

    const passwordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!passwordCorrect) {
      return send(res).unauthorized();
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET_KEY);

    res.setHeader("Authorization", `Bearer ${token}`);
    
    return send(res).ok("User logged succesfully")
  });

  register = catchErrors(async (req: Request, res: Response) => {
    const { email, password } = userBodySchema.parse(req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await db.user.create({
      data: {
        email,
        password: hash,
      },
    });

    return send(res).createOk(user);
  });
}
