export {};

import * as typegoose from "@typegoose/typegoose";
import { OfferSchema } from "./offers";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/checkingIndexes";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "GptCompetency",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class GptCompetencySchema {
  @typegoose.prop({ index: { name: "gptcompetencies_slug", unique: true } })
  public slug: string;
  @typegoose.prop()
  public extension: string;
  @typegoose.prop({ index: { name: "gptcompetencies_title" } })
  public title: string;
  @typegoose.prop()
  public definition: string;
  @typegoose.prop()
  public relatedSkills: string[];
  @typegoose.prop()
  public advantages: string[];
  @typegoose.prop()
  public examples: string[];
  @typegoose.prop()
  public importance: string;
  @typegoose.prop()
  public development: string;
  @typegoose.prop()
  public keywords: string[];
  @typegoose.prop()
  public conclusion: string;
  @typegoose.prop({ default: [], ref: () => "Offer" })
  public offersIds: typegoose.Ref<OfferSchema>[];
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.GptCompetency ||
  typegoose.getModelForClass(GptCompetencySchema);

const myIndexes = {
  _id: { name: "_id_" },
  title: { name: "gptcompetencies_title" },
  slug: { name: "gptcompetencies_slug", unique: true },
} as IndexList;

checkingIndexes<GptCompetencySchema>(myIndexes, model);

export default model;
