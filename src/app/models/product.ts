import { UUID } from "../types/uuid";
import Category from "./category";

export default interface Product {
  id: UUID,
  health_registration_number: string,
  product_name: string,
  cost_price: number,
  selling_price: number,
  description?: string,
  composition?: string,
  admision_date: Date,
  expiration_date: Date,
  category?: Category,
  brand_name?: string,
}
