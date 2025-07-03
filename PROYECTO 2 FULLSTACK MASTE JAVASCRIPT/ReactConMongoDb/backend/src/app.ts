import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { corsMiddleware } from "./middleware/corsAccessMiddleware";
import path = require("path");

connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware);

// Rutas
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
