import { html } from "@elysiajs/html";
import { compare } from 'bcrypt'
import { Elysia, t } from "elysia";
import { userController } from "./controller/user.controller";
import { packageController } from "./controller/package.controller";
import { tradeController } from "./controller/trade.controller";
import { cardController } from "./controller/card.controller";
import swagger from "@elysiajs/swagger";
export const server = new Elysia({})
  .use(swagger())
  .use(userController)  
  .use(packageController)
  .use(tradeController)
  .use(cardController)
  .listen(3000);
console.log("Server running on http://localhost:3000");