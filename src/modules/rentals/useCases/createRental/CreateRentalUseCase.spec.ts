import dayjs from "dayjs";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepositoryMock } from "@modules/rentals/repositories/mocks/RentalsRepositoryMock";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let createRentalsRepository: IRentalsRepository;
let dayJsProvider: IDateProvider;

describe("Create rental", () => {
  const dayPlus24Hour = dayjs().add(24, "hours").toDate();
  beforeEach(() => {
    createRentalsRepository = new RentalsRepositoryMock();
    dayJsProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      createRentalsRepository,
      dayJsProvider
    );
  });

  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayPlus24Hour,
    });

    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there is an opened rent for the same user", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayPlus24Hour,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental if there is an opened rent for the same car", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayPlus24Hour,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "121523",
        car_id: "121212",
        expected_return_date: dayPlus24Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "121523",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
