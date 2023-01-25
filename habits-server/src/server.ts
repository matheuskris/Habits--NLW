import Fastfy from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastfy();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("app is running on 'http://localhost:3000'");
  });
