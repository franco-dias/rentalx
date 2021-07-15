import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { carRoutes } from "./cars.routes";
import { categoryRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use(authRoutes);
router.use("/categories", categoryRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carRoutes);
router.use("/rentals", rentalRoutes);

export { router };
