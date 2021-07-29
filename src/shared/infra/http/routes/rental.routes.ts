import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const devolutionRentalController = new DevolutionRentalController();
const createRentalController = new CreateRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle
);

rentalRoutes.post(
  "/:id/devolution",
  ensureAuthenticated,
  ensureAdmin,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
