import { Request, Response } from "express";
import { container } from "tsyringe";

import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });
    return res.status(201).json(car);
  }
}

export { CreateCarController };
