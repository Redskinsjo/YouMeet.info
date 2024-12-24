import {
  LinkedList,
  SortableArray,
  BinarySearchTree,
  Heap,
  Trie,
} from "@youmeet/performance";

// 12000 elements, makes difference between LinkedList and Array
const list = [
  { names: { last: "Fitzgerald" } },
  { names: { last: "Ivanov" } },
  { names: { last: "Doe" } },
  { names: { last: "Eugene" } },
  { names: { last: "Harris" } },
  { names: { last: "Garcia" } },
  { names: { last: "Garfield" } },
];

(() => {
  const strList = list.map((item) => item.names.last);

  const trie = new Trie(strList);
  console.log(trie.autocomplete("Gar"));
})();
