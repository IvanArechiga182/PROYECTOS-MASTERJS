import { Router } from "express";
import controller from "../controllers/endpoints";

const router = Router();

//rutas con los endpoints
router.get("/test", controller.home);

export default router;
