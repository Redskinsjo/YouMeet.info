import { getOne } from "@youmeet/competencies";

(async () => {
  console.log(await getOne({ data: { title: "React.js" } }));
})();
