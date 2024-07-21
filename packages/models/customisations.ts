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
    customName: "Customisation",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class CustomisationSchema {
  @typegoose.prop()
  public name: string;
  @typegoose.prop({ ref: () => "BetaUser" })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Customisation ||
  typegoose.getModelForClass(CustomisationSchema);

export default model;
