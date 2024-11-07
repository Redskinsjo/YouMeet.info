const { getMany } = require("@youmeet/competencies");

(async () => {
  const competencies = await getMany({ data: { title: "communication" } });
  console.log(competencies);
})();
