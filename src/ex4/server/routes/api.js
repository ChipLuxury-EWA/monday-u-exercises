// Define your endpoints here (this is your "controller file")
import express from "express";
//routes import;
import taskRoutes from "./v1/task.routes.js";
import healthRoutes from "./v1/health.routes.js";

const router = express.Router();



router.use("/health", healthRoutes);
router.use("/task", taskRoutes);

export default router;
