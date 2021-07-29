import dayjs from "dayjs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepositoryMock } from "@modules/rentals/repositories/mocks/RentalsRepositoryMock";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let carsRepository: ICarsRepository;
let createRentalsRepository: IRentalsRepository;
let dayJsProvider: IDateProvider;
let car: Car;

describe("Create rental", () => {
  const dayPlus24Hour = dayjs().add(24, "hours").toDate();
  beforeEach(async () => {
    createRentalsRepository = new RentalsRepositoryMock();
    carsRepository = new CarsRepositoryMock();
    dayJsProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalsRepository,
      carsRepository,
      dayJsProvider
    );

    car = await carsRepository.create({
      brand: "Test",
      category_id: "Test",
      daily_rate: 100,
      description: "Test",
      id: "Test",
      fine_amount: 10,
      license_plate: "Test",
      name: "Test",
      specifications: [
        {
          id: "spec",
          name: "spec",
          description: "spec description",
          created_at: new Date(),
        },
      ],
    });
  });

  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayPlus24Hour,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there is an opened rent for the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayPlus24Hour,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental if there is an opened rent for the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayPlus24Hour,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "121523",
        car_id: car.id,
        expected_return_date: dayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "121523",
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
