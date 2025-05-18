import DataHead from "./data-head";

export class DataTable<T> {
  head: DataHead[];
  data: T[];

  constructor({ head, data } : {head: DataHead[], data: T[]}) {
    this.head = head;
    this.data = data;
  }
}
