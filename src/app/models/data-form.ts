import DataHead from "./data-head";

export class DataForm<T> {
  head: DataHead[];
  data: T[];

  constructor({ head, data } : {head: DataHead[], data: T[]}) {
    this.head = head;
    this.data = data;
  }
}
