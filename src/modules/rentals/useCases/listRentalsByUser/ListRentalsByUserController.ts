import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );
    const { id } = req.user;

    const rentals = await listRentalsByUserUseCase.execute(id);

    return res.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
