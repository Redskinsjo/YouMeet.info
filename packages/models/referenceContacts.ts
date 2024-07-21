export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaExperienceSchema } from "./betaExperiences";
import type { Phone } from "./types";
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
    customName: "ReferenceContact",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ReferenceContactSchema {
  @typegoose.prop()
  public name: string;
  @typegoose.prop()
  public email: string;
  @typegoose.prop()
  public phone: Phone;
  @typegoose.prop()
  public position: boolean;
  @typegoose.prop({ ref: () => "BetaExperience" })
  public experienceId: typegoose.Ref<BetaExperienceSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.ReferenceContact ||
  typegoose.getModelForClass(ReferenceContactSchema);

export default model;
