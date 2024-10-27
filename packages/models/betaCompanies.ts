export {};

import * as typegoose from "@typegoose/typegoose";
import type { Avatars } from "./types";
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
    customName: "BetaCompany",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaCompanySchema {
  @typegoose.prop({ index: { name: "betacompanies_name", unique: true } })
  public name: string;
  @typegoose.prop({ index: { name: "betacompanies_autocompletions" } })
  public autocompletions: string[];
  @typegoose.prop()
  public resume: string;
  @typegoose.prop()
  public location: string;
  @typegoose.prop()
  public scrapped: boolean;
  @typegoose.prop()
  public video: Avatars;
  @typegoose.prop()
  public linkedinProfilePage: string;
  @typegoose.prop()
  public pro: boolean;
  @typegoose.prop()
  public logo: Avatars;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaCompany || typegoose.getModelForClass(BetaCompanySchema);

const myIndexes = {
  _id: { name: "_id_" },
  name: { name: "betacompanies_name", unique: true },
  autocompletions: { name: "betacompanies_autocompletions" },
} as IndexList;

checkingIndexes<BetaCompanySchema>(myIndexes, model);

export default model;
