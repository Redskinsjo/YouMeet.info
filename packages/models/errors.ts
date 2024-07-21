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
    customName: "Error",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ErrorSchema {
  @typegoose.prop()
  public environment: string;
  @typegoose.prop()
  public pro: boolean;
  @typegoose.prop()
  public query: string;
  @typegoose.prop()
  public type: number;
  @typegoose.prop()
  public message: string;
  @typegoose.prop()
  public status: number;
  @typegoose.prop()
  public statusText: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Error || typegoose.getModelForClass(ErrorSchema);

export default model;
