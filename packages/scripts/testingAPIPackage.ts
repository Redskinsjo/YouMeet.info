import prisma from "@youmeet/prisma-config/prisma";
import { setUniqueSlugAndExtension } from "@youmeet/utils/backoffice/setUniqueInput";

(async () => {
  const competencies = await prisma.competencies.findMany({
    where: { extension: { equals: "" } },
  });
  for (let i = 0; i < competencies.length; i++) {
    const competency = competencies[i];
    const { extension, slug } = await setUniqueSlugAndExtension(
      competency.title.toLowerCase(),
      0,
      "competencies"
    );
    try {
      const updated = await prisma.competencies.update({
        where: {
          id: competency.id,
        },
        data: {
          extension,
          slug,
        },
      });
      if (!updated) {
        console.log(`Competency ${competency.id} has no child`);
        continue;
      }
      console.log(`Competency ${competency.id} has a child`);
    } catch (e) {
      console.error(e);
    }
  }
  process.exit(0);
})();
