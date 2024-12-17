export class Node {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class DoubleNode {
  value;
  next;
  previous;
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export class TreeNode {
  value;
  left;
  right;
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
