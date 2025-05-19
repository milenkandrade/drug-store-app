import { UUID } from "../types/uuid";
import DateRange from "./date-range";
import Supplier from "./supplier";

export default interface Alert {
  id: UUID,
  product_id: UUID,
  product_name: string,
  stock: number,
  expiration_date: Date,
  message: string,
  type: string
  supplier_name: string
}
