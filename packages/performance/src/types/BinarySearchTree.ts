import { TreeNode } from "./Nodes.js";

export declare class BinarySearchTree<T> {
  root: TreeNode<T> | null;
  pointer: string | null;
  constructor(array: T[], pointer: string);

  private fromArray(array: T): BinarySearchTree<T>;
  private pointedValue(object: T): any;
  private areStrings(value1: any, value2: any): boolean;
  private areObjects(value1: any, value2: any): boolean;
  private isGreater(value1: any, value2: any): boolean;
  private isEqual(value1: any, value2: any): boolean;
  private node_value(node: TreeNode<T>): string | number | boolean | null;
  private lift(
    node: TreeNode<T>,
    nodeToDelete: TreeNode<T>
  ): TreeNode<T> | null;
  delete(searchValue: string | boolean | number | null): TreeNode<T> | null;
  insert(el: T | null): TreeNode<T> | null;
  search(searchValue: string | boolean | number | null): TreeNode<T> | null;
}
