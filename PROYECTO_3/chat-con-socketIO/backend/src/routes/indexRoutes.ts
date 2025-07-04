import { Router } from "express";
import appRoutes from "./routes";
const router = Router();

router.use("/chat", appRoutes);

export default router;
