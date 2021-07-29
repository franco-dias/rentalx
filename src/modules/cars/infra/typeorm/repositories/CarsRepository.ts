import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import {
  ICarFilters,
  ICarsRepository,
} from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    brand,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      specifications,
      id,
    });

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate: licensePlate });
    return car;
  }

  async findAvailable({
    category_id,
    brand,
    name,
  }: ICarFilters): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    // const car = await this.findById(id);
    // Object.assign(car, { available });
    // await this.repository.save(car);
    // return car;
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
