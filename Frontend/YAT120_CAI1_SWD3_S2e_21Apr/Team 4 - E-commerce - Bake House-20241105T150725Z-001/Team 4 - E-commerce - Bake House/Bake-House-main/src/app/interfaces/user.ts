import { Product } from './product';

export interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  order?: Product;
}
