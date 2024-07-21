export {};

import * as typegoose from "@typegoose/typegoose";
import { JobSchema } from "./jobs";
import { CustomisationSchema } from "./customisations";
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
    customName: "Question",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class QuestionSchema {
  @typegoose.prop()
  public type: String;
  @typegoose.prop()
  public prefix: String;
  @typegoose.prop()
  public text: String;
  @typegoose.prop()
  public generated: string;
  @typegoose.prop({ ref: () => "Job" })
  public jobId: typegoose.Ref<JobSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "Customisation" })
  public customisationId: typegoose.Ref<CustomisationSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Question || typegoose.getModelForClass(QuestionSchema);

export default model;
