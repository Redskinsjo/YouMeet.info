import { TrieNode } from "./Nodes";

export declare class Trie<T> {
  private root: TrieNode<T> | null;
  constructor(array: T[]);

  private fromArray(array: T[]): Trie<T>;
  private pointedValue(object: T): any;
  private areStrings(value1: any, value2: any): boolean;
  private search(word: string): TrieNode<T> | null;
  private insert(word: string): void;
  private collectAllWords(
    node: TrieNode<T>,
    word: string,
    words: string[]
  ): void;
  autocomplete(prefix: string): string[];
}
