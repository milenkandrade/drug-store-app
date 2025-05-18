import Pageable from "./pageable";

export default interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

  export function createPage<T>(content: T[], { size = 10, page = 1 }: Pageable) {
    let pageable: Page<T> = { content, totalPages: 0, totalElements: 0, size, number: page  }
    pageable.content = getPage(content, { size, page })
    pageable.size = size
    pageable.totalElements = content.length
    pageable.totalPages = Math.round(content.length / size)
    pageable.number = page
    return pageable
  }

  function getPage(content: any[], { size = 10, page = 1 }: Pageable) {
    return content.slice(page > 1 ? size*(page-1) : page-1, page > 1 ? (page*size) : size)
  }
