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
    customName: "FormQuestion",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class FormQuestionSchema {
  @typegoose.prop()
  public title: string;
  @typegoose.prop()
  public type: string;
  @typegoose.prop()
  public target: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.FormQuestion ||
  typegoose.getModelForClass(FormQuestionSchema);

export default model;
