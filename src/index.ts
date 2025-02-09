import { errorHandler } from "@middlewares";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { configDotenv } from 'dotenv';
import db, { createUsersTable } from "@config";
import router from '@router'

configDotenv()

const app = express()

app.use(cors({
  origin: process.env.REACT_ROUTE,
  credentials: true,
}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await createUsersTable();
})();

app.use('/', router)
app.use(errorHandler)

const PORT = Number(process.env.PORT)

app.listen(PORT, () => console.log(`✅ Server running: http://localhost:${PORT}`))

process.on("SIGINT", async () => {
  await db.end();
  console.log("⚠️ Pool has been closed");
  process.exit(0);
});