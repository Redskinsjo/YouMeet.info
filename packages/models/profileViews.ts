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
    customName: "ProfileView",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ProfileViewSchema {
  @typegoose.prop({ ref: () => "BetaUser" })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public count: number;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.ProfileView || typegoose.getModelForClass(ProfileViewSchema);

export default model;
