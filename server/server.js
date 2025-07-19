import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// mongoose connection
await connectDB();

// middlewares
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://draftly-aawaxzd9t-harshal-bhosales-projects.vercel.app",
  "https://draftly-wine.vercel.app", // Add the correct frontend origin
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

app.options("*", cors()); // Preflight

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("API is working."));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
});

export default app;
