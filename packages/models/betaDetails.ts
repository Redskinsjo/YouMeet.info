export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaProfileSchema } from "./betaProfiles";
import { BetaUserSchema } from "./betaUsers";
import { BetaCandidateSchema } from "./betaCandidates";
import type { Phone } from "./types";
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
    customName: "BetaDetails",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaDetailsSchema {
  @typegoose.prop()
  public websites: String;
  @typegoose.prop()
  public twitter: String;
  @typegoose.prop()
  public facebook: String;
  @typegoose.prop()
  public birthday: String;
  @typegoose.prop({ index: { name: "betadetails_phone" } })
  public phone: Phone;
  @typegoose.prop()
  public phone2: Phone;
  @typegoose.prop({ index: { name: "betadetails_email" } })
  public email: String;
  @typegoose.prop()
  public email2: String;
  @typegoose.prop()
  public principal: Boolean;
  @typegoose.prop({ ref: () => "BetaProfile" })
  public profileId: typegoose.Ref<BetaProfileSchema>;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "betadetails_userid", unique: true },
  })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaCandidate" })
  public candidateId: typegoose.Ref<BetaCandidateSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaDetails || typegoose.getModelForClass(BetaDetailsSchema);

const myIndexes = {
  _id: { name: "_id_" },
  userId: { name: "betadetails_userid", unique: true },
  email: { name: "betadetails_email" },
  phone: { name: "betadetails_phone" },
} as IndexList;

checkingIndexes<BetaDetailsSchema>(myIndexes, model);

export default model;
