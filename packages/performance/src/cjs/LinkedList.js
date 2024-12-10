export class Node {
  value;
  next;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head;
  constructor(array) {
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
    return current.value;
  }
  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current.value;
      }
      if (current.next) current = current.next;
      else break;
    }
    return null;
  }
}
