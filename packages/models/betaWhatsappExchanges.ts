export {};

import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
import { BetaWhatsappThreadSchema } from "./betaWhatsappThreads";
import { QuestionSchema } from "./questions";
import { BetaWhatsappResponseSchema } from "./betaWhatsappResponses";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaWhatsappExchange",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaWhatsappExchangeSchema {
  @typegoose.prop()
  public step: number;
  @typegoose.prop({ ref: () => "BetaWhatsappThread" })
  public threadId: typegoose.Ref<BetaWhatsappThreadSchema>;
  @typegoose.prop({ ref: () => "Question" })
  public questionId: typegoose.Ref<QuestionSchema>;
  @typegoose.prop({ ref: () => "BetaWhatsappResponse" })
  public responsesIds: typegoose.Ref<BetaWhatsappResponseSchema>[];
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaWhatsappThread ||
  typegoose.getModelForClass(BetaWhatsappExchangeSchema);

export default model;
