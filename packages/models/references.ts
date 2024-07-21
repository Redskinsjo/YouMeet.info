export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaExperienceSchema } from "./betaExperiences";
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
    customName: "Reference",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ReferenceSchema {
  @typegoose.prop()
  public content: string;
  @typegoose.prop()
  public concerned: string;
  @typegoose.prop()
  public valid: boolean;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "references_userId" },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaExperience" })
  public experienceId: typegoose.Ref<BetaExperienceSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Reference || typegoose.getModelForClass(ReferenceSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "references_userId" },
} as IndexList;

checkingIndexes<ReferenceSchema>(myIndexes, model);

export default model;
