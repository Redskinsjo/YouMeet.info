export {};
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/checkingIndexes";
import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "TopSector",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class TopSectorSchema {
  @typegoose.prop({ index: { name: "topsectors_title" } })
  public title: object;
  @typegoose.prop()
  public bgImage: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.TopSector || typegoose.getModelForClass(TopSectorSchema);

const myIndexes = {
  _id: { name: "_id_" },
  title: { name: "topsectors_title" },
} as IndexList;

checkingIndexes<TopSectorSchema>(myIndexes, model);

export default model;
