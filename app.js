// import cookieParser from "cookie-parser";
// import cors from "cors";
import "dotenv/config";
import express from "express";
import { startDB } from "./src/config/database.js";
import { routes } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

app.use("/api", routes);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
