import model from "@youmeet/models/offers";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";

(async () => {
  console.log("checking indexes...");
  const indexes = await model.collection.getIndexes();

  console.log(indexes, "indexes");
  process.exit(0);
})();
