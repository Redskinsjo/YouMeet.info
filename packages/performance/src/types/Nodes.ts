export declare class Node<T> {
  value: T;
  next: Node<T> | null;
}

export declare class DoubleNode<T> {
  value: T;
  next: DoubleNode<T> | null;
  previous: DoubleNode<T> | null;
}

export declare class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
