import { UUID } from "../types/uuid";
import Category from "./category";

export default interface Product {
  id: UUID,
  health_registration_number: string,
  product_name: string,
  cost_price: number,
  sale_price: number,
  admision_date: Date,
  expiration_date: Date,
  supplier_name: string,
  require: string,
  brand_name?: string,
  description?: string,
  composition?: string,
  category?: Category,
}
