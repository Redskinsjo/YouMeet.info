import { SortableArray } from "@youmeet/performance";

(() => {
  console.log("Process PID", process.pid);
  process.stdout.write("Go ? ");

  process.stdin.on("data", (data) => {
    console.log(`Allons-y !`);

    const array = new Array<number>(1000000);
    for (let i = 0; i < array.length; i++) {
      console.log(`Array[${i}]: ${array[i]}`);
    }

    console.log(array.length); // 10

    // const arr = new SortableArray<number>(array);
    // arr.quicksort();

    process.uptime();
    process.memoryUsage();
    process.cpuUsage();
    process.availableMemory();

    process.exit(0);
  });
})();
