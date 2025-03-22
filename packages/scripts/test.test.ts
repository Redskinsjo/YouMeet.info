import filter from "./utils/collectOffers/filters";
import { vi, test, describe, expect } from "vitest";
const candidates = [
  {
    userId: "1",
    targetContractType: "CDI",
    targetJobId: "1",
    salaryExpected: "50000",
    avatars: [],
  },
  {
    userId: "2",
    targetContractType: "CDI",
    targetJobId: "2",
    salaryExpected: "50000",
    avatars: [],
  },
  {
    userId: "2",
    targetContractType: "CDI",
    targetJobId: "2",
    avatars: [],
  },
];

const users = [{ id: "3" }, { id: "4" }];

const doublon = () => filter.doublon(candidates, { users });
const noUser = () => filter.noUser(candidates, { users });

const doublonMock = vi.fn().mockImplementation(doublon);
const noUserMock = vi.fn().mockImplementation(noUser);

describe("filtering candidates in collectOffers", () => {
  test("check doublon", async () => {
    expect(doublonMock().length).toBe(2);
  });
  test("check noUser", async () => {
    expect((await noUser()).count).toBe(3);
  });
});
