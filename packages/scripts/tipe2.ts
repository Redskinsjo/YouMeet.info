import pid from "pidusage";
import si from "systeminformation";
import prisma from "@youmeet/prisma-config/prisma";

(() => {
  process.stdout.write("Quel est le PID ? ");

  process.stdin.on("data", (data) => {
    const processpid = data.toString().trim();
    console.log(`Allons-y pour ${processpid} !`);
    // setInterval(() => {
    //   pid(processpid, (err, stats) => {
    //     if (err) {
    //       console.error("Error fetching process stats:", err);
    //       return;
    //     }
    //     console.log("Process stats:", stats);
    //     console.log("CPU Usage:", stats.cpu);
    //     console.log("Memory Usage:", stats.memory);
    //     console.log("Process ID:", stats.pid);
    //     console.log("Timestamp:", stats.timestamp);
    //   });
    // }, 1000);
  });
  let docs = 0;
  let id = undefined;
  id = setInterval(() => {
    si.cpuTemperature()
      .then(async (data) => {
        // if (docs == 100) clearInterval(id);
        await prisma.tipe.create({
          data: {
            temperature: data,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log("saved:", data.main, "°C");
        docs++;
      })
      .catch((error) => console.error(error));
  }, 1000);
  if (!id) process.exit(0);
})();
