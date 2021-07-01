import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { categoryRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use(authRoutes);
router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);

export { router };
