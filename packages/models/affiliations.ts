export {};

import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
import { BetaUserSchema } from "./betaUsers";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Affiliation",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class AffiliationSchema {
  @typegoose.prop()
  public parentId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Affiliation || typegoose.getModelForClass(AffiliationSchema);

export default model;
