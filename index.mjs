import "dotenv/config";

import express from "express";
import cors from "cors";
import { errorHandler } from "./error.mjs";
import userRouter from "./user/router.mjs";
import manageStockRouter from "./manageStock/router.mjs";

const app = express();

const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for frontend origin
app.use(
  cors({
    origin: "*", // allow your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // if using cookies or auth headers
  })
);

app.use(express.json());

app.use("/users", userRouter);
app.use("/manageStock", manageStockRouter);

app.all(/^.*$/, (req, res) => {
  res.status(400).json({ msg: "route dosen't exists" });
});

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started on port ${PORT}`);
});
