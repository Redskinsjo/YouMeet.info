import { TreeNode } from "./Nodes.js";

export class BinarySearchTree {
  root;
  pointer;
  constructor(array, pointer) {
    this.root = null;
    this.pointer = pointer;
    if (array) {
      this.fromArray(array);
    }
  }
  fromArray(array) {
    for (let i = 0; i < array.length; i++) {
      const node = this.insert(array[i]);
      if (i === 0) this.root = node;
    }
    return this;
  }
  pointedValue(object) {
    const keys = this.pointer ? this.pointer.split(".") : undefined;
    if (!keys) return object;
    const value = keys?.reduce((acc, curr) => {
      if (acc[curr]) return acc[curr];
      return acc;
    }, object);
    return value;
  }
  areStrings(value1, value2) {
    return typeof value1 === "string" && typeof value2 === "string";
  }
  areObjects(value1, value2) {
    return typeof value1 === "object" && typeof value2 === "object";
  }
  isGreater(value1, value2) {
    if (this.areStrings(value1, value2)) {
      return value1.charCodeAt(0) > value2.charCodeAt(0);
    } else if (this.areObjects(value1, value2)) {
      const pointedValue1 = this.pointedValue(value1);
      const pointedValue2 = this.pointedValue(value2);

      // console.log(pointedValue1, pointedValue2, "values");
      if (this.areStrings(pointedValue1, pointedValue2)) {
        return pointedValue1.charCodeAt(0) > pointedValue2.charCodeAt(0);
      } else {
        return this.pointedValue(value1) > this.pointedValue(value2);
      }
    } else {
      return value1 > value2;
    }
  }
  isEqual(value1, value2) {
    if (this.areStrings(value1, value2)) {
      return value1.charCodeAt(0) === value2.charCodeAt(0);
    } else if (this.areObjects(value1, value2)) {
      const pointedValue1 = this.pointedValue(value1);
      const pointedValue2 = this.pointedValue(value2);

      if (this.areStrings(pointedValue1, pointedValue2)) {
        return pointedValue1.charCodeAt(0) === pointedValue2.charCodeAt(0);
      } else {
        return this.pointedValue(value1) === this.pointedValue(value2);
      }
    } else {
      return value1 === value2;
    }
  }
  node_value(node) {
    if (node === null) return null;
    const keys = this.pointer ? this.pointer.split(".") : undefined;
    const isObject = typeof node.value === "object";
    let nodeValue = node.value;
    if (isObject && keys) {
      const reducedPointer = keys.reduce((acc, curr) => {
        if (acc[curr]) return acc[curr];
        return acc;
      }, nodeValue);
      nodeValue = reducedPointer;
    }
    return nodeValue;
  }
  search(searchValue, node = this.root) {
    if (node === null || this.isEqual(this.node_value(node), searchValue)) {
      return node;
    } else if (this.isGreater(this.node_value(node), searchValue)) {
      return this.search(searchValue, node.left);
    } else {
      return this.search(searchValue, node.right);
    }
  }
  insert(el, node = this.root) {
    if (node === null) return new TreeNode(el);

    if (this.isGreater(node.value, el)) {
      if (node.left === null) {
        node.left = new TreeNode(el);
      } else {
        this.insert(el, node.left);
      }
    } else if (this.isGreater(el, node.value)) {
      if (node.right === null) {
        node.right = new TreeNode(el);
      } else {
        node.right = this.insert(el, node.right);
      }
    }
    return node;
  }
  delete(searchValue, node = this.root) {
    if (node === null) {
      return null;
    } else if (this.isGreater(this.node_value(node), searchValue)) {
      node.left = this.delete(searchValue, node.left);
      return node;
    } else if (this.isGreater(searchValue, this.node_value(node))) {
      node.right = this.delete(searchValue, node.right);
      return node;
    } else if (this.isEqual(searchValue, this.node_value(node))) {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        node.right = this.lift(node.right, node);
        return node;
      }
    }
  }
  lift(node, nodeToDelete) {
    if (node.left) {
      node.left = this.lift(node.left, nodeToDelete);
      return node;
    } else {
      nodeToDelete.value = node.value;
      return node.right;
    }
  }
}
