export const waitFor = async (time: number) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, time);
  });
