import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";
import { SpecificationsRepositoryMock } from "@modules/cars/repositories/mocks/SpecificationsRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryMock: CarsRepositoryMock;
let specificationsRepositoryMock: SpecificationsRepositoryMock;

const specificationData: ICreateSpecificationDTO = {
  name: "Test Specification",
  description: "Test",
};

const carData: ICreateCarDTO = {
  name: "Car name",
  brand: "Car brand",
  description: "Car description",
  daily_rate: 100,
  license_plate: "ABC1234",
  fine_amount: 60,
  category_id: "category",
};

describe("create car specification", () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock();
    specificationsRepositoryMock = new SpecificationsRepositoryMock();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock,
      specificationsRepositoryMock
    );
  });

  it("should be able to add a new specification to a car", async () => {
    const car = await carsRepositoryMock.create(carData);
    const specification = await specificationsRepositoryMock.create(
      specificationData
    );

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications).toHaveLength(1);
  });

  it("should not be able to add a new specification to a car that does not exist", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
