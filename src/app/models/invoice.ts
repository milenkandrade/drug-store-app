import { UUID } from "../types/uuid";

export default interface Invoice {
  id: UUID,
  invoice_identifier: string,
  client_registration_number: string,
  suplier_registration_number: string,
  client_id: UUID,
  supplier_id: UUID,
  incidencias: UUID[],
  details: Record<string, number>,
  total_invoice: number
}
