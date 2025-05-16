import { UUID } from "../types/uuid"

export default interface User {
  client_id: UUID,
  registration_number: string
  company_name: string
}
