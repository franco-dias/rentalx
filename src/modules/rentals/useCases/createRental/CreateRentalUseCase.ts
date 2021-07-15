import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalTime = 24;
    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (isCarUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const isUserUnavailable = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (isUserUnavailable) {
      throw new AppError("User already has a rental open");
    }

    const compare = this.dateProvider.differenceInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < minimumRentalTime) {
      throw new AppError("The rental must have a 24 hours minimum duration");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
