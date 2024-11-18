import { IndexList } from "@youmeet/types/IndexList";
import { Model } from "mongoose";

export const checkingIndexes = <T>(myIndexes: IndexList, model: Model<T>) => {
  model.collection
    .getIndexes()
    .then(async (indexes: any) => {
      const scheduledIndexes = Object.entries(myIndexes);

      try {
        for (let j = 0; j < scheduledIndexes.length; j++) {
          const scheduledIndex = scheduledIndexes[j];
          const scheduledIndexKey = scheduledIndex[0];
          const scheduledIndexOptions = scheduledIndex[1];

          let isAlreadyCreated = false;

          const entries = Object.entries(indexes);
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i] as [string, [[string, number]]];
            const existingIndexName = entry[0];

            const indexKey = entry[1][0][0];

            if (!!myIndexes[indexKey]) {
              // index is fine
              if (myIndexes[indexKey].name !== existingIndexName) {
                // index has not the same name
                const indexes = await model.collection.getIndexes();
                if (indexes[existingIndexName]) {
                  await model.collection.dropIndex(existingIndexName);
                }
              } else {
                isAlreadyCreated = true;
              }
            } else {
              // index is not fine
              const indexes = await model.collection.getIndexes();
              if (indexes[existingIndexName]) {
                console.log("2");
                await model.collection.dropIndex(existingIndexName);
              }
            }
          }
          if (!isAlreadyCreated) {
            console.log("3");
            await model.collection.createIndex(
              { [scheduledIndexKey]: 1 },
              scheduledIndexOptions
            );
          }
        }
      } catch (err: any) {
        console.log(
          `UNE ERREUR avec la vérification d'index: `,
          err.message,
          err.type
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
