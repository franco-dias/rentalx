import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "@modules/accounts/repositories/mocks/UsersRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;

const user: ICreateUserDTO = {
  name: "John Doe",
  driver_license: "123456",
  email: "john@doe.com",
  password: "123456",
};

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
  });

  it("should be able to authenticate", async () => {
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate non-existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "john@doe.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
