import { app } from "./app";
import { env } from "./_env";

app.listen({
  host: '0.0.0.0', // Acessível ao front-end
  port: env.PORT,
}).then(() => {
  console.log('HTTP Server Running!')
})