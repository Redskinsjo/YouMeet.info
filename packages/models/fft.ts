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
    customName: "Fft",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class FftSchema {
  @typegoose.prop()
  public amplitude: number;
  @typegoose.prop()
  public frequency: number;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Fft || typegoose.getModelForClass(FftSchema);

export default model;
