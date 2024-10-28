import prisma from "@youmeet/prisma-config/prisma";

(async () => {
  const competencies = await prisma.competencies.findMany();
  for (let i = 0; i < competencies.length; i++) {
    const competency = competencies[i];
    const set = new Set(competency.appelations.map((a) => a.toLowerCase()));
    await prisma.competencies.update({
      where: { id: competency.id },
      data: { appelations: { set: Array.from(set) } },
    });
  }
  console.log("Competencies transferred successfully");
  process.exit(0);
})();
