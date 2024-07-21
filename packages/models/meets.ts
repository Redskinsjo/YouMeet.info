export {};

import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
import { MeetCandidateSchema } from "./meetCandidates";
import { MeetRecruiterSchema } from "./meetRecruiters";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Meet",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class MeetSchema {
  @typegoose.prop({ ref: () => "MeetRecruiter" })
  public meetRecruiterId: typegoose.Ref<MeetRecruiterSchema>;
  @typegoose.prop({ ref: () => "MeetCandidate" })
  public meetCandidateId: typegoose.Ref<MeetCandidateSchema>;
  @typegoose.prop()
  public expired: boolean;
  @typegoose.prop()
  public token: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Meet || typegoose.getModelForClass(MeetSchema);

export default model;
