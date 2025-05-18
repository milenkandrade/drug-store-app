import Pageable from "./pageable";

export default interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export function createPage<T>(content: T[], { size = 10, number = 1 }: Pageable) {
  let pageable: Page<T> = { content, totalPages: 0, totalElements: 0, size, number  }
  pageable.content = getPage(content, { size, number })
  pageable.size = size
  pageable.totalElements = content.length
  pageable.totalPages = Math.round(content.length / size)
  pageable.number = number
  return pageable
}

function getPage(content: any[], { size = 10, number = 1 }: Pageable) {
  return content.slice(number > 1 ? size*(number-1) : number-1, number > 1 ? (number*size) : size)
}
