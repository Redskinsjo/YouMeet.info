export {};

import * as typegoose from "@typegoose/typegoose";
import type { Phone } from "./types";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import { JobSchema } from "./jobs";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;
@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "MeetCandidate",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class MeetCandidateSchema {
  @typegoose.prop()
  public firstname: string;
  @typegoose.prop()
  public lastname: string;
  @typegoose.prop()
  public fullname: string;
  @typegoose.prop()
  public linkedinProfileId: string;
  @typegoose.prop({ index: { name: "meetcandidates_email", unique: true } })
  public email: string;
  @typegoose.prop()
  public phone: Phone;
  @typegoose.prop({ ref: () => "Job" })
  public jobId: typegoose.Ref<JobSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.MeetCandidate ||
  typegoose.getModelForClass(MeetCandidateSchema);

const myIndexes = {
  _id: { name: "_id_" },
  email: { name: "meetcandidates_email", unique: true },
} as IndexList;

checkingIndexes<MeetCandidateSchema>(myIndexes, model);

export default model;
