import { MaterialType } from '../enums/matrial-type.enum';

export class NewOrderDto {
  email: string;
  type: MaterialType;
  amount: number;
}
