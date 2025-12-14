import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import ratelimiter from "./middleware/ratelimit.js";
import { initDb } from "./config/db.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production") job.start()



//middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT;

app.get("/api/health",(req,res) => {
  res.status(200).json({status : "ok"})
})

app.use("/api/transactions", transactionsRoute);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on ", PORT);
  });
});
