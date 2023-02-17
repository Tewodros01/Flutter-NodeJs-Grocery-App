import express from "express";
import morgan from "morgan";
import path from "path";
import indexRoutes from "./routes/index.route";
import connectDB from "./config/db.conn";

// Initializations
const app: express.Application = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", indexRoutes);

// Public
app.use("/uploads", express.static(path.resolve("uploads")));

(async () => {
  try {
    await connectDB();
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
  } catch (e) {
    console.log(e);
  }
})();
