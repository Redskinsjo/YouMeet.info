import prisma from "@youmeet/prisma-config/prisma";

const filter = {
  testRequests: (users: any[], candidates: any[]) => [
    function deleteDoublon(curr) {
      candidates = candidates.filter((candidate) => candidate !== curr);
    },
    function getUser(candidate: any) {
      return users.find((user) => user.id === candidate.userId);
    },
  ],
  requests: [
    async function deleteDoublon(candidate) {
      await prisma.betacandidates.delete({
        where: { id: candidate.id },
      });
    },
    async function getUser(candidate) {
      return await prisma.betausers.findUnique({
        where: { id: candidate.userId },
      });
    },
  ],
  async doublon(candidates: any[], test?: { users }) {
    let requests;
    if (test) {
      requests = this.testRequests(test.users, candidates);
    } else {
      requests = this.requests;
    }

    const reduced = {};
    // return the candidates without doublon
    for (let i = 0; i < candidates.length; i++) {
      const curr = candidates[i];

      if (reduced[curr.userId]) {
        const countData = (curr: {
          targetJobId: string;
          targetContractType: string;
          salaryExpected: string;
          avatars: object[];
        }) => {
          let count = 0;
          if (curr.targetJobId) count++;
          if (curr.targetContractType) count++;
          if (curr.salaryExpected) count++;
          if (curr.avatars.length > 0) count++;
          return count;
        };

        // if the doublon candidate has more data than the existing candidate
        if (countData(curr) > countData(reduced[curr.userId]))
          reduced[curr.userId] = curr;
        else {
          // delete doublon candidate
          await requests[0](curr);
        }
      } else {
        reduced[curr.userId] = curr;
      }
    }
    return Object.values(reduced);
  },
  async noUser(candidates: any[], test?: { users }) {
    let requests;
    let count = 0;
    if (test) {
      requests = this.testRequests(test.users, candidates);
    } else {
      requests = this.requests;
    }
    try {
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate.userId) {
          const exist = await requests[1](candidate);
          console.log(exist);
          if (!exist) {
            // delete candidate
            requests[0](candidate);
            count++;
          }
        }
      }
      return { count };
    } catch (err) {
      return { error: err, count };
    }
  },
};

export default filter;
