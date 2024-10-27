export {};

import * as typegoose from "@typegoose/typegoose";
import { OfferSchema } from "./offers";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Competency",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class CompetencySchema {
  @typegoose.prop({ index: { name: "competencies_slug", unique: true } })
  public slug: string;
  @typegoose.prop()
  public extension: string;
  @typegoose.prop({ index: { name: "competencies_title" } })
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
  public appelations: string[];
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
  mongoose.models.Competency || typegoose.getModelForClass(CompetencySchema);

const myIndexes = {
  _id: { name: "_id_" },
  title: { name: "competencies_title" },
  slug: { name: "competencies_slug", unique: true },
} as IndexList;

checkingIndexes<CompetencySchema>(myIndexes, model);

export default model;
