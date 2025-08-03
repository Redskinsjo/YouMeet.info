import dotenv from "dotenv";
import { execute } from "../script";
import { test, expect } from "vitest";
import { sites } from "../sites";
dotenv.config();

export const slow = process.env.NODE_ENV === "test"; // slow down the script for testing purposes
export const resetWaitingTime = 10; // seconds

export const addErr = (input: string, err: undefined | string[]) => {
  if (!err) {
    err = [input];
  } else {
    err.push(input);
  }
  return err;
};
