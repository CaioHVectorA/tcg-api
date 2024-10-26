import { html } from "@elysiajs/html";
import { cors } from '@elysiajs/cors'
import { compare } from 'bcrypt'
import { Elysia, t } from "elysia";
import { userController } from "./controller/user.controller";
import { packageController } from "./controller/package.controller";
import { tradeController } from "./controller/trade.controller";
import { cardController } from "./controller/card.controller";
import { authController } from "./controller/auth.controller";
import { swagger } from "./middlewares/swagger";
export const server = new Elysia({})
  .use(cors({ 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Type', 'Authorization'],
    credentials: true
   }))
  .use(swagger)
  .use(authController)
  .use(userController)  
  .use(packageController)
  .use(tradeController)
  .use(cardController)
  .listen(8080);
console.log("Server running");