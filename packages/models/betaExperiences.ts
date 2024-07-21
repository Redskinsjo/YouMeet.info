export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaCompanySchema } from "./betaCompanies";
import { BetaProfileSchema } from "./betaProfiles";
import { BetaCandidateSchema } from "./betaCandidates";
import { BetaUserSchema } from "./betaUsers";
import { BetaDetailsSchema } from "./betaDetails";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/checkingIndexes";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaExperience",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaExperienceSchema {
  @typegoose.prop({
    ref: () => "BetaDetails",
  })
  public detailsId: typegoose.Ref<BetaDetailsSchema>;
  @typegoose.prop({
    ref: () => "BetaCandidate",
  })
  public candidateId: typegoose.Ref<BetaCandidateSchema>;
  @typegoose.prop({
    ref: () => "BetaCompany",
  })
  public companyId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop()
  public companyName: string;
  @typegoose.prop()
  public ending: string;
  @typegoose.prop()
  public starting: string;
  @typegoose.prop()
  public duration: number;
  @typegoose.prop()
  public isLiveJob: boolean;
  @typegoose.prop()
  public isTargetJob: boolean;
  @typegoose.prop({
    ref: () => "BetaExperience",
    index: { name: "betaexperiences_jobId" },
  })
  public jobId: typegoose.Ref<BetaExperienceSchema>;
  @typegoose.prop()
  public password: string;
  @typegoose.prop({ default: false })
  public confirmed: boolean;
  @typegoose.prop({ default: false })
  public referenced: boolean;
  @typegoose.prop()
  public previouslyEmployed: boolean;
  @typegoose.prop({ default: [], ref: () => "BetaProfile" })
  public referencesIds: typegoose.Ref<BetaProfileSchema>[];
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "betaexperiences_userId" },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaExperience ||
  typegoose.getModelForClass(BetaExperienceSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "betaexperiences_userId" },
  jobId: { name: "betaexperiences_jobId" },
} as IndexList;

checkingIndexes<BetaExperienceSchema>(myIndexes, model);

export default model;
