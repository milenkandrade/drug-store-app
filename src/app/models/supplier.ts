import { UUID } from "../types/uuid";

export default interface Supplier {
  id: UUID,
  company_name: string,
  registration_number: string,
  addresss?: string,
  contact_number?: string
}
