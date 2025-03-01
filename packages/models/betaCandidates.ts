export {};

import * as typegoose from "@typegoose/typegoose";
import type { Avatars } from "./types";
import { BetaUserSchema } from "./betaUsers";
import { JobSchema } from "./jobs";
import mongoose from "mongoose";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import { IndexList } from "@youmeet/types/IndexList";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaCandidate",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaCandidateSchema {
  @typegoose.prop()
  public avatars: Avatars[];
  @typegoose.prop()
  public salaryExpected: string;
  @typegoose.prop()
  public type: string;
  @typegoose.prop()
  public bgImage: string;
  @typegoose.prop({ default: false })
  public confirmed: boolean;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "betacandidates_userid", unique: true },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "Job" })
  public targetJobId: typegoose.Ref<JobSchema>;
  @typegoose.prop()
  public targetContractType: string;
  @typegoose.prop()
  public preferredLocation: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaCandidate ||
  typegoose.getModelForClass(BetaCandidateSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "betacandidates_userid", unique: true },
} as IndexList;

checkingIndexes<BetaCandidateSchema>(myIndexes, model);

export default model;
