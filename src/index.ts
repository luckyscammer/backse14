import { errorHandler } from "@middlewares";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { configDotenv } from 'dotenv';
import db, { createProjectMembersTable, createProjectsTable, createTasksTable, createUsersTable } from "@config";
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

const migrations = [
  createUsersTable,
  createProjectsTable,
  createProjectMembersTable,
  createTasksTable
];

(async () => {
  try {
    for (const migrate of migrations) {
      await migrate();
      console.log(`Migration ${migrate.name} completed`);
    }
    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
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