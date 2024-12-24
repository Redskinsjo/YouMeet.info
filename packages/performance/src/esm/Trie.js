import { TrieNode } from "./Nodes";

export class Trie {
  root;
  constructor(array) {
    this.root = new TrieNode();
    if (array) {
      this.fromArray(array);
    }
  }
  fromArray(words) {
    for (let i = 0; i < words.length; i++) {
      this.insert(words[i]);
    }
  }
  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toLowerCase();
      const child = node?.children[letter];
      if (!child) return null;
      node = child;
    }
    return node;
  }
  insert(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toLowerCase();
      const child = node?.children[letter];
      if (!child) {
        const newNode = new TrieNode();
        if (node?.children)
          node.children = { ...node.children, [letter]: newNode };

        node = newNode;
      } else {
        node = child;
      }
    }
    if (node?.children) node.children = { ...node.children, ["*"]: null };
  }
  collectAllWords(node = null, word = "", words = []) {
    const entries = node.children ? Object.entries(node.children) : [];
    for (let i = 0; i < entries.length; i++) {
      const [key, child] = entries[i];
      if (key === "*") {
        words.push(word);
      } else {
        this.collectAllWords(child, word + key, words);
      }
    }
    return words;
  }
  autocomplete(prefix) {
    const node = this.search(prefix);

    if (!node) return [];
    return this.collectAllWords(node);
  }
}
