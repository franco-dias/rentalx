interface ICreateRentalDTO {
  id?: string;
  total?: number;
  user_id: string;
  car_id: string;
  end_date?: Date;
  expected_return_date: Date;
}

export { ICreateRentalDTO };
