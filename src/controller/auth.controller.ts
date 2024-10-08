import Elysia, { t } from "elysia";
import { jwt } from "../middlewares/jwt/jwt";
import { prisma } from "../helpers/prisma.client";
import { compare, hash } from "bcrypt";

export const authController = new Elysia({}).group("/auth", (app) => {
  return app
    .use(jwt)
    .decorate("prisma", prisma)
    .post(
      "/login",
      async ({ body, jwt, set }) => {
        const { email, password } = body;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
          set.status = 404;
          return { error: "User not found" } ;
        } 
        const isValid = await compare(password, user.password);
        if (!isValid) {
          set.status = 400;
          return { error: "Invalid password" };
        }
        const token = await jwt.sign({ id: user.id });
        console.log({ token, verify: await jwt.verify(token) });
        return { token };
      },
      {
        body: t.Object({ email: t.String(), password: t.String() }),
        detail: { tags: ["Auth"], description: "Login to the system" },
        response: {
          200: t.Object({ token: t.String()}, { description: "Token do usuário" }),
          400: t.Object({ error: t.String()}, { description: "Erro de senha incorreta" } ),
          404: t.Object({ error: t.String()}, { description: "Erro de usuário não encontrado" } ),
        }
        // response: t.Array(t.String(), {  }),
        // response: t.Object({ token: t.String() })
      },
    )
    .post(
      "/register",
      async ({ body, jwt, set }) => {
        const { email, password, username } = body;
        const alreadyExists = await prisma.user.findFirst({ where: { email } });
        const hashed = await hash(password, 10);
        if (alreadyExists) {
          set.status = 400;
          return { error: "User already exists" };
        }
        const user = await prisma.user.create({
          data: { email, password: hashed, username },
        });
        const token = await jwt.sign({ id: user.id });
        return { token };
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
          username: t.String(),
        }),
        detail: { tags: ["Auth"] },
        response: {
          200: t.Object({ token: t.String() }, { description: "Token do usuário" }),
          400: t.Object({ error: t.String() }, { description: "Erro de usuário já existente" }),
        },
      }
    );
});
