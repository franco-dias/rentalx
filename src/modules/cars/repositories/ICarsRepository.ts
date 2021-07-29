import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarFilters {
  category_id?: string;
  brand?: string;
  name?: string;
}
interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(filters?: ICarFilters): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarFilters, ICarsRepository };
