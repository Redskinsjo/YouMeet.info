export declare class Heap<T> {
  data: T[] | null;
  pointer: string;
  constructor(array: T[], pointer: string);

  get root(): T | null;
  get last(): T | null;
  private left_index(index: number): number;
  private right_index(index: number): number;
  private parent_index(index: number): number;
  private fromArray(array: T[]): Heap<T>;
  private pointedValue(object: T): any;
  private areStrings(value1: any, value2: any): boolean;
  private areObjects(value1: any, value2: any): boolean;
  private isGreater(value1: any, value2: any): boolean;
  insert(value: T): void;
  private swap(leftPointer: number, rightPointer: number, array: T[]): void;
  delete(): void;
  private has_greater_child(index: number): boolean;
  private get_greater_child_index(index: number): number;
}
