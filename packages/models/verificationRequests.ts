export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import type { Avatars } from "./types";
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
    customName: "VerificationRequest",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class VerificationRequestSchema {
  @typegoose.prop()
  public type: String[];
  @typegoose.prop()
  public professionalProofs: Avatars[];
  @typegoose.prop()
  public academicProofs: Avatars[];
  @typegoose.prop()
  public judiciaryProofs: Avatars[];
  @typegoose.prop({ ref: () => "BetaUser" })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.VerificationRequest ||
  typegoose.getModelForClass(VerificationRequestSchema);

export default model;
