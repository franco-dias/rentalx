import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryMock } from "@modules/cars/repositories/mocks/CarsRepositoryMock";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepository: ICarsRepository;
let createCarsUseCase: CreateCarUseCase;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List cars", () => {
  beforeEach(async () => {
    carsRepository = new CarsRepositoryMock();
    createCarsUseCase = new CreateCarUseCase(carsRepository);
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);

    await createCarsUseCase.execute({
      name: "Car name 1",
      brand: "brand 1",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 60,
      category_id: "category",
    });
    await createCarsUseCase.execute({
      name: "Car name 2",
      brand: "brand 2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC12D4",
      fine_amount: 60,
      category_id: "category",
    });
    await createCarsUseCase.execute({
      name: "Car name 3",
      brand: "brand 2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "JFL1264",
      fine_amount: 60,
      category_id: "category",
    });
    await createCarsUseCase.execute({
      name: "Car name 4",
      brand: "brand 2",
      description: "Car description",
      daily_rate: 100,
      license_plate: "JFL1254",
      fine_amount: 60,
      category_id: "category 2",
    });
  });

  it("should be possible to list all available cars", async () => {
    const cars = await listAvailableCarsUseCase.execute();
    expect(cars).toHaveLength(4);
  });

  it("should be possible to list cars by category id", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category",
    });
    expect(cars).toHaveLength(3);
  });

  it("should be possible to list cars by brand name", async () => {
    const cars = await listAvailableCarsUseCase.execute({ brand: "brand 1" });
    expect(cars).toHaveLength(1);
  });

  it("should be possible to list cars by name", async () => {
    const cars = await listAvailableCarsUseCase.execute({ name: "Car name 4" });
    expect(cars).toHaveLength(1);
  });
});
