export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
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
    customName: "UserRemark",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class UserRemarkSchema {
  @typegoose.prop()
  public content: string;
  @typegoose.prop({ ref: () => "BetaUser" })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.UserRemark || typegoose.getModelForClass(UserRemarkSchema);

export default model;
