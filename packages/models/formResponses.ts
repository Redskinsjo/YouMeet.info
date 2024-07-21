export {};

import * as typegoose from "@typegoose/typegoose";
import { FormQuestionSchema } from "./formQuestions";
import { LeadSchema } from "./leads";
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
    customName: "FormResponse",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class FormResponseSchema {
  @typegoose.prop({ ref: () => "FormQuestion" })
  public questionId: typegoose.Ref<FormQuestionSchema>;
  @typegoose.prop()
  public content: string;
  @typegoose.prop({ default: "text" })
  public type: string;
  @typegoose.prop({ default: false })
  public isTrue: boolean;
  @typegoose.prop({ ref: () => "Lead" })
  public leadId: typegoose.Ref<LeadSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.FormResponse ||
  typegoose.getModelForClass(FormResponseSchema);

export default model;
