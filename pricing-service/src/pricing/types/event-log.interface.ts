import { MaterialTitle } from '../../storage/enums/material-title.enum';

export interface EventLogInterface {
  material: MaterialTitle;
  price: number;
  currency: string;
}
