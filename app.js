import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
// import { userRoutes } from "./src/routes/user.routes.js";

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser()); //para poder leer las cookies

// rutas
// app.use("/api", userRoutes);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
