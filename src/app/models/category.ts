import { UUID } from "../types/uuid";

export default interface Category {
  id: UUID,
  name: string,
  image_url?: string
}
