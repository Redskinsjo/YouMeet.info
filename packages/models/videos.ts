export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaCompanySchema } from "./betaCompanies";
import { JobSchema } from "./jobs";
import type { Avatars } from "./types";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/checkingIndexes";
import { MeetCandidateSchema } from "./meetCandidates";
import { BetaWhatsappExchangeSchema } from "./betaWhatsappExchanges";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;
@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Video",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class VideoSchema {
  @typegoose.prop()
  public transcript: string;
  @typegoose.prop()
  public confidence: Number;
  @typegoose.prop()
  public audio: Avatars;
  @typegoose.prop()
  public report: string;
  @typegoose.prop({ default: false })
  public principal: boolean;
  @typegoose.prop({ ref: () => "BetaUser", index: { name: "videos_userId" } })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({
    ref: () => "BetaCompany",
    index: { name: "videos_companyId" },
  })
  public companyId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop({ ref: () => "Job" })
  public jobId: typegoose.Ref<JobSchema>;
  @typegoose.prop({ ref: () => "BetaWhatsappExchange" })
  public exchangeId: typegoose.Ref<BetaWhatsappExchangeSchema>;
  @typegoose.prop({ default: 0 })
  public likes: number;
  @typegoose.prop()
  public file: Avatars;
  @typegoose.prop({ ref: () => "MeetCandidate" })
  public meetCandidateId: typegoose.Ref<MeetCandidateSchema>;
  @typegoose.prop()
  public preview: boolean;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Video || typegoose.getModelForClass(VideoSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "videos_userId" },
  companyId: { name: "videos_companyId" },
} as IndexList;

checkingIndexes<VideoSchema>(myIndexes, model);

export default model;
