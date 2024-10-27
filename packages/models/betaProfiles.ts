export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaExperienceSchema } from "./betaExperiences";
import mongoose from "mongoose";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import { IndexList } from "@youmeet/types/IndexList";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaProfile",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaProfileSchema {
  @typegoose.prop()
  public allSkills: String;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "betaprofiles_userId", unique: true },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ default: [], ref: () => "BetaExperience" })
  public refExperiencesIds: typegoose.Ref<BetaExperienceSchema>[];
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}
const model =
  mongoose.models.BetaProfile || typegoose.getModelForClass(BetaProfileSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "betaprofiles_userId", unique: true },
} as IndexList;

checkingIndexes<BetaProfileSchema>(myIndexes, model);

export default model;
