import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import ratelimiter from "./middleware/ratelimit.js";
import { initDb } from "./config/db.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

//middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/transactions", transactionsRoute);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on ", PORT);
  });
});
