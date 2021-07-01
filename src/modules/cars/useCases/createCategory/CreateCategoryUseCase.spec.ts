import { CategoriesRepositoryMock } from "@modules/cars/repositories/mocks/CategoriesRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryMock;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Test Category",
      description: "Category description test",
    };
    await createCategoryUseCase.execute(category);
    const createdCategory = await categoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create two categories with the same name", async () => {
    expect(async () => {
      const category = {
        name: "Test Category",
        description: "Category description test",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
