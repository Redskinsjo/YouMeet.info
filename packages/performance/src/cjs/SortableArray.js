export class SortableArray {
  length;
  array;
  constructor(array) {
    this.array = array;
    this.length = array.length;
  }

  toString() {
    return this.array.toString();
  }

  partition(leftPointer, rightPointer) {
    const pivotIndex = rightPointer;
    const pivot = this.array[pivotIndex];
    rightPointer--;

    while (true) {
      while (this.array[leftPointer] < pivot && leftPointer <= pivotIndex) {
        leftPointer++;
      }
      while (this.array[rightPointer] > pivot && rightPointer > 0) {
        rightPointer--;
      }

      if (leftPointer >= rightPointer) {
        break;
      } else {
        this.swap(leftPointer, rightPointer);
        leftPointer++;
      }
    }

    this.swap(leftPointer, pivotIndex);

    return leftPointer;
  }

  swap(leftPointer, rightPointer) {
    const leftValue = this.array[leftPointer];
    const rightValue = this.array[rightPointer];
    this.array[leftPointer] = rightValue;
    this.array[rightPointer] = leftValue;
  }

  quicksort(leftIndex = 0, rightIndex = this.length - 1) {
    if (rightIndex - leftIndex <= 0) return;
    const pivotIndex = this.partition(leftIndex, rightIndex);

    this.quicksort(0, pivotIndex - 1);
    this.quicksort(pivotIndex + 1, rightIndex);
    return this.array;
  }
}
