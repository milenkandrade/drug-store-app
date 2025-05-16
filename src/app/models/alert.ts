import { UUID } from "../types/uuid";
import DateRange from "./date-range";

export default interface Alert {
  id: UUID,
  product_id: UUID,
  date_range: DateRange,
  mesage: string,
  type: string
}
