import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryMock: CarsRepositoryMock;

const carData: ICreateCarDTO = {
  name: "Car name",
  brand: "Car brand",
  description: "Car description",
  daily_rate: 100,
  license_plate: "ABC1234",
  fine_amount: 60,
  category_id: "category",
};

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    createCarUseCase = new CreateCarUseCase(carsRepositoryMock);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute(carData);
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute(carData);
      await createCarUseCase.execute({ ...carData, name: "Car name 2" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create an available car by default", async () => {
    const car = await createCarUseCase.execute(carData);
    expect(car.available).toBe(true);
  });
});
