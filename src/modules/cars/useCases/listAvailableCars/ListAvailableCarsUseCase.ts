import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import {
  ICarFilters,
  ICarsRepository,
} from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute(filters?: ICarFilters): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(filters);
    return cars;
  }
}

export { ListAvailableCarsUseCase };
