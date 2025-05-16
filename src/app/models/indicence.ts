import { UUID } from "../types/uuid";

export default interface Incidence {
  id: UUID,
  title: string,
  description: string,
  invoice_id: UUID
}
