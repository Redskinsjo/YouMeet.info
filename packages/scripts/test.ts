const list = [2, 1, 3, 8, 5, 10, 7, 4, 9, 6];

class SortableArray {
  constructor(public array: number[]) {}

  partition(lPointer: number, rPointer: number) {
    if (lPointer - rPointer <= 0) return;

    const length = this.array.length;
    const pivot = this.array[length - 1];
    let leftPointer = lPointer === undefined ? 0 : lPointer;
    let rightPointer = rPointer === undefined ? length - 2 : rPointer;

    while (true) {
      let move = false;
      if (this.array[leftPointer] < pivot) {
        leftPointer++;
        move = true;
      }
      if (this.array[rightPointer] > pivot) {
        rightPointer--;
        move = true;
      }
      if (!move) {
        if (leftPointer >= rightPointer) {
          break;
        } else {
          this.swap(leftPointer, rightPointer);
        }
      }
    }
    this.swap(leftPointer, length - 1);

    return leftPointer;
  }

  swap(leftPointer: number, rightPointer: number) {
    const leftValue = this.array[leftPointer];
    const rightValue = this.array[rightPointer];
    this.array[leftPointer] = rightValue;
    this.array[rightPointer] = leftValue;
  }

  quicksort() {
    const leftPointer = this.partition(0, list.length - 2);
    this.partition(0, leftPointer - 1);
  }
}

(async () => {
  const sortableArray = new SortableArray(list);

  console.log(sortableArray.array);
})();
