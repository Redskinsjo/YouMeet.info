export {};

import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
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
    customName: "Article",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ArticleSchema {
  @typegoose.prop({ index: { name: "articles_slug", unique: true } })
  public slug: string;
  @typegoose.prop()
  public extension: string;
  @typegoose.prop()
  public title: Object;
  @typegoose.prop()
  public description: Object;
  @typegoose.prop()
  public introduction: Object;
  @typegoose.prop()
  public conclusion: Object;
  @typegoose.prop()
  public paragraphs: Object[];
  @typegoose.prop()
  public links: Object[];
  @typegoose.prop()
  public new: boolean;
  @typegoose.prop()
  public bgImage: string;
  @typegoose.prop()
  public alt: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Article || typegoose.getModelForClass(ArticleSchema);

const myIndexes = {
  _id: { name: "_id_" },
  slug: { name: "articles_slug", unique: true },
} as IndexList;

checkingIndexes<ArticleSchema>(myIndexes, model);

export default model;
