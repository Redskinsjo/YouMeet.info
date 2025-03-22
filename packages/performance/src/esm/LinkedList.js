import { Node } from "./Nodes.js";

export class LinkedList {
  head;
  pointer;
  constructor(array) {
    this.head = null;
    this.pointer = null;
    if (array) {
      this.fromArray(array);
    }
  }

  fromArray(array) {
    for (let i = 0; i < array.length; i++) {
      this.append(array[i]);
    }
    return this;
  }
  pointedValue(object) {
    const keys = this.pointer ? this.pointer.split(".") : undefined;
    if (!keys) return object;
    const value = keys.reduce((acc, curr) => {
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
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  deleteAt(i) {
    let current = this.head;
    let index = 0;
    while (index < i - 1) {
      if (current.next) {
        current = current.next;
        index++;
      } else break;
    }
    const deleted = current.next;
    current.next = current.next.next;
    return deleted;
  }
  insertAt(i, value) {
    let current = this.head;
    let index = 0;
    while (index < i - 1) {
      if (current.next) {
        current = current.next;
        index++;
      } else break;
    }
    const newNode = new Node(value);
    newNode.next = current.next;
    current.next = newNode;
    return current.next.next;
  }
  readAt(i) {
    let current = this.head;
    let index = 0;
    while (index < i) {
      if (current.next) {
        current = current.next;
        index++;
      } else break;
    }
    return current;
  }
  search(value, pointer) {
    this.pointer = pointer;
    const keys = pointer ? pointer.split(".") : undefined;
    let isObject = typeof this.head.value === "object";
    let current = isObject ? { ...this.head } : this.head;

    while (current) {
      let target = current.value;
      if (isObject && keys) {
        const reducedPointer = keys.reduce((acc, curr) => {
          if (acc[curr]) return acc[curr];
          return acc;
        }, current.value);
        target = keys ? reducedPointer : current.value;
      }

      if (this.isEqual(target, value)) {
        return current;
      }
      if (current.next) current = current.next;
      else break;
    }
    return null;
  }
}
