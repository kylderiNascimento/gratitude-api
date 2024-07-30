import { app } from "./app";

app.listen({
  host: '0.0.0.0', // Acessível ao front-end
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!')
})