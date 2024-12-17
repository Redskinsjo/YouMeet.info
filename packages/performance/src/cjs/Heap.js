/**
 * Utile pour développer certaines fonctionnalités First In, First Out (FIFO) telles que les files d'attente (Priority Queues).
 * @argument {array} list - Liste.
 * @argument {string} pointer - En cas de liste d'objets (ex: {names: {first: "John", last: "Doe"}), pointeur (clé, de type string, au format "names.last") à partir duquel organiser le tas.
 **/
export class Heap {
  data;
  pointer;
  constructor(array, pointer) {
    this.data = [];
    this.pointer = pointer;
    if (array) this.fromArray(array);
  }
  get root() {
    return this.data[0];
  }
  get last() {
    return this.data[this.data.length - 1];
  }
  left_index(index) {
    return 2 * index + 1;
  }
  right_index(index) {
    return 2 * index + 2;
  }
  parent_index(index) {
    return Math.floor(index / 2);
  }

  fromArray(array) {
    for (let i = 0; i < array.length; i++) {
      this.insert(array[i]);
    }
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
  isGreater(value1, value2) {
    if (this.areStrings(value1, value2)) {
      return value1.charCodeAt(0) > value2.charCodeAt(0);
    } else if (this.areObjects(value1, value2)) {
      const pointedValue1 = this.pointedValue(value1);
      const pointedValue2 = this.pointedValue(value2);

      if (this.areStrings(pointedValue1, pointedValue2)) {
        return pointedValue1.charCodeAt(0) > pointedValue2.charCodeAt(0);
      } else {
        return this.pointedValue(value1) > this.pointedValue(value2);
      }
    } else {
      return value1 > value2;
    }
  }
  insert(value) {
    this.data.push(value);

    let index = this.data.length - 1;

    while (
      index > 0 &&
      this.isGreater(this.data[index], this.data[this.parent_index(index)])
    ) {
      this.swap(index, this.parent_index(index), this.data);
      index = this.parent_index(index);
    }
  }
  swap(leftPointer, rightPointer, array) {
    const leftValue = array[leftPointer];
    const rightValue = array[rightPointer];
    array[leftPointer] = rightValue;
    array[rightPointer] = leftValue;
  }
  delete() {
    this.data[0] = this.data.pop();
    let trickle_node_index = 0;

    while (this.has_greater_child(trickle_node_index)) {
      const greater_child_index =
        this.get_greater_child_index(trickle_node_index);
      this.swap(trickle_node_index, greater_child_index, this.data);
      trickle_node_index = greater_child_index;
    }
  }
  has_greater_child(index) {
    const node = this.data[index];
    const left = this.data[this.left_index(index)];
    const right = this.data[this.right_index(index)];
    return (
      (left && this.isGreater(left > node)) ||
      (right && this.isGreater(right > node))
    );
  }
  get_greater_child_index(index) {
    const left_index = this.left_index(index);
    const right_index = this.right_index(index);

    if (!this.data[right_index]) {
      return left_index;
    }
    if (this.isGreater(this.data[right_index] > this.data[left_index])) {
      return right_index;
    } else {
      return left_index;
    }
  }
}
