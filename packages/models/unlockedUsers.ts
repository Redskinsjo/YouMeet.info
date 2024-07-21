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
    customName: "UnlockedUser",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class UnlockedUserSchema {
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
  mongoose.models.UnlockedUser ||
  typegoose.getModelForClass(UnlockedUserSchema);

export default model;
