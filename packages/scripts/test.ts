import {
  LinkedList,
  SortableArray,
  BinarySearchTree,
  Heap,
} from "@youmeet/performance";

// 12000 elements, makes difference between LinkedList and Array
const list = [
  { names: { last: "Fitzgerald" } },
  { names: { last: "Ivanov" } },
  { names: { last: "Doe" } },
  { names: { last: "Eugene" } },
  { names: { last: "Harris" } },
  { names: { last: "Garcia" } },
];

(() => {
  // const evaluate1 = () => {
  //   const start = performance.now();
  //   list.unshift(0);
  //   const end = performance.now();
  //   return { time: (end - start).toFixed(10) };
  // };
  // const evaluate2 = (linkedList) => {
  //   const start = performance.now();
  //   linkedList.insertAt(0, 0);
  //   const end = performance.now();
  //   return { time: (end - start).toFixed(10) };
  // };
  // console.log(list.length, "li");
  // console.log(1, evaluate1());
  // const linkedList = new LinkedList(list);
  // console.log(2, evaluate2(linkedList));
  // const array = new SortableArray(list);
  // const binarySearchTree = new BinarySearchTree(list);
  // const searched = binarySearchTree.search(5);
  // console.log(searched, "searched");
  const heap = new Heap(list, "names.last");
  console.log(heap.data);
  heap.insert({ names: { last: "B" } });
  console.log("insert B");
  console.log(heap.data);
  console.log(heap.root);
  heap.delete();
  console.log("delete");
  console.log(heap.data);
  console.log(heap.last);
})();
