export declare class SortableArray<T> {
  length: number;
  array: T[];
  constructor(array: T[]);

  toString(): T[];
  private partition(leftPointer: number, rightPointer: number): number;
  private swap(leftPointer: number, rightPointer: number): void;
  quicksort(leftIndex?: number, rightIndex?: number): T[] | undefined;
}
