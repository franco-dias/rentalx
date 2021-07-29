import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarFilters, ICarsRepository } from "../ICarsRepository";

class CarsRepositoryMock implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findAvailable(filters?: ICarFilters): Promise<Car[]> {
    if (!filters) return this.cars;
    const {
      category_id = "",
      brand = "",
      name = "",
    } = filters || ({} as ICarFilters);
    const cars = this.cars
      .filter((car) => car.available)
      .filter(
        (car) =>
          car.category_id === category_id ||
          car.brand === brand ||
          car.name === name
      );
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === id);
    return car;
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === car_id);
    this.cars[index].available = available;
  }
}

export { CarsRepositoryMock };
