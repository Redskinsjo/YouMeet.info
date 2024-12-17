import { Node } from "./Nodes";

export declare class LinkedList<T> {
  head: Node<T> | null;
  pointer: string | null;
  constructor(array: T[]);

  private fromArray(array: T): LinkedList<T>;
  private pointedValue(object: T): any;
  private areStrings(value1: any, value2: any): boolean;
  private areObjects(value1: any, value2: any): boolean;
  private isEqual(value1: any, value2: any): boolean;
  append(value: T): void;
  deleteAt(i: number): Node<T> | null;
  insertAt(i: number, value: T): Node<T> | null;
  readAt(i: number): Node<T> | null;
  search(
    value: boolean | string | number | null,
    pointer?: string
  ): Node<T> | null;
}
