export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import { MeetRecruiterSchema } from "./meetRecruiters";
import { MeetCandidateSchema } from "./meetCandidates";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;
@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Feedback",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class FeedbackSchema {
  @typegoose.prop({ required: true })
  public content: string;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "feedbacks_userId" },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public authorId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "MeetCandidate" })
  public candidateId: typegoose.Ref<MeetCandidateSchema>;
  @typegoose.prop({ ref: () => "MeetRecruiter" })
  public recruiterId: typegoose.Ref<MeetRecruiterSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Feedback || typegoose.getModelForClass(FeedbackSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "feedbacks_userId" },
} as IndexList;

checkingIndexes<FeedbackSchema>(myIndexes, model);

export default model;
