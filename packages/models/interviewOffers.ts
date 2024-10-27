export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "InterviewOffer",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class InterviewOfferSchema {
  @typegoose.prop({
    default: "pending",
    index: { name: "interviewoffers_status" },
  })
  public status: string;
  @typegoose.prop()
  public datetime: Date;
  @typegoose.prop()
  public comment: string;
  @typegoose.prop({
    ref: () => "BetaUser",
  })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "interviewoffers_targetId" },
  })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.InterviewOffer ||
  typegoose.getModelForClass(InterviewOfferSchema);

const myIndexes = {
  _id: { name: "_id_" },
  targetId: { name: "interviewoffers_targetId" },
  status: { name: "interviewoffers_status" },
} as IndexList;

checkingIndexes<InterviewOfferSchema>(myIndexes, model);

export default model;
