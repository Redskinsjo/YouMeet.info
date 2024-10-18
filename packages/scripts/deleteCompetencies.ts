import prisma from "@youmeet/prisma-config/prisma";

(async () => {
  const competencies = await prisma.competencies.findMany();

  for (let i = 0; i < competencies.length; i++) {
    const competency = competencies[i];
    if (competency.title.includes("+") || competency.title.includes("#")) {
      await prisma.competencies.delete({
        where: {
          id: competency.id,
        },
      });
    }
  }
})();
