import express from "express";
import itemRoutes from "./items/routes";

const router = express.Router();
router.use(itemRoutes);

export default router;