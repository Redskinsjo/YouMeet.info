export {};

import * as typegoose from "@typegoose/typegoose";
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
    customName: "Tipe",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class TipeSchema {
  @typegoose.prop()
  public temperature: object;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Tipe || typegoose.getModelForClass(TipeSchema);

export default model;
