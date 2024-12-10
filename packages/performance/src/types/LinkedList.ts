export declare class Node<T> {
  value: T;
  next: Node<T> | null;
}

export declare class LinkedList<T> {
  private head: Node<T> | null;
  constructor(array: T[]);

  private fromArray(array: T): LinkedList<T>;
  append(value: T): void;
  deleteAt(i: number): Node<T> | null;
  insertAt(i: number, value: T): Node<T> | null;
  readAt(i: number): Node<T> | null;
  search(value: T | null): Node<T> | null;
}
