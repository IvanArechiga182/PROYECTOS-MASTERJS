import { Router } from "express";
import controller from "../controllers/project";
import uploadMiddleware from "../middleware/UploadFilesMiddleware";

const router = Router();

router.get("/home", controller.home);
router.post("/test", controller.test);
router.post("/saveProject", controller.saveProject);
router.get("/findProjectById/:projectId", controller.findProject);
router.delete("/deleteProjectById", controller.deleteProject);
router.get("/getProjectsData", controller.getProjectsData);
router.put("/updateProject", controller.updateProject);
router.post("/postContactInfo", controller.postContactInfo);
router.post(
  "/uploadImageToProject/:id",
  uploadMiddleware.single("file"),
  controller.uploadImageToProject
);
router.delete("/emptyCollection", controller.emptyCollection);
export default router;
