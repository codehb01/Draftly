import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// mongoose connection
await connectDB();

// middlewares
app.use(
  cors({
    origin: "https://draftly-wine.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("API is working."));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is runnning on PORT: " + PORT);
});

export default app;
