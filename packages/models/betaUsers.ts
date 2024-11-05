export {};

import * as typegoose from "@typegoose/typegoose";
import type { AuthDetails, Avatars } from "./types";
import { JobSchema } from "./jobs";
import { OfferSchema } from "./offers";
import mongoose from "mongoose";
import { BetaCompanySchema } from "./betaCompanies";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import { IndexList } from "@youmeet/types/IndexList";
import { AffiliationSchema } from "./affiliations";
import dotenv from "dotenv";
mongoose.connect(`${process.env.MONGODB_URI}`);

mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaUser",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaUserSchema {
  @typegoose.prop()
  public age: number;
  @typegoose.prop()
  public auth: AuthDetails;
  @typegoose.prop({ default: 0 })
  public credit: number;
  @typegoose.prop({ default: 0 })
  public cardPrice: number;
  @typegoose.prop()
  public description: string;
  @typegoose.prop({ index: { name: "betausers_email", unique: true } })
  public email: string;
  @typegoose.prop({ index: { name: "betausers_uniquename", unique: true } })
  public uniqueName: string;
  @typegoose.prop()
  public firstname: string;
  @typegoose.prop({ index: { name: "betausers_fullname" } })
  public fullname: string;
  @typegoose.prop({ default: "" })
  public extension: string;
  @typegoose.prop({ default: [] })
  public languages: string[];
  @typegoose.prop()
  public lastname: string;
  @typegoose.prop()
  public customerId: string;
  @typegoose.prop({ index: { name: "betausers_linkedinprofileid" } })
  public linkedinProfileId: string;
  @typegoose.prop({ ref: () => "Job" })
  public rolesIds: typegoose.Ref<JobSchema>[];
  @typegoose.prop()
  public phone: string;
  @typegoose.prop()
  public picture: string;
  @typegoose.prop({ default: false })
  public trial: boolean;
  @typegoose.prop()
  public active: boolean;
  @typegoose.prop({ default: false })
  public isPublic: boolean;
  @typegoose.prop()
  public role: string;
  @typegoose.prop()
  public unlimited: boolean;
  @typegoose.prop({ index: { name: "betausers_user" } })
  public user: boolean;
  @typegoose.prop({ index: { name: "betausers_pro" } })
  public pro: boolean;
  @typegoose.prop()
  public scrapped: boolean;
  @typegoose.prop()
  public status: boolean;
  @typegoose.prop()
  public cvFile: Avatars;
  @typegoose.prop({ default: false })
  public cv: boolean;
  @typegoose.prop({ default: false })
  public consent: boolean;
  @typegoose.prop({ ref: () => "Offer" })
  public candidatedOffersIds: typegoose.Ref<OfferSchema>[];
  @typegoose.prop({ ref: () => "BetaCompany" })
  public companyId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop({ ref: () => "Affiliation" })
  public affiliationId: typegoose.Ref<AffiliationSchema>;
  @typegoose.prop({ default: [] })
  public hiddenFields: string[];
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaUser || typegoose.getModelForClass(BetaUserSchema);

const myIndexes = {
  _id: { name: "_id_" },
  pro: { name: "betausers_pro" },
  user: { name: "betausers_user" },
  linkedinProfileId: { name: "betausers_linkedinprofileid" },
  fullname: { name: "betausers_fullname" },
  uniqueName: { name: "betausers_uniquename", unique: true },
  email: { name: "betausers_email", unique: true },
} as IndexList;

checkingIndexes<BetaUserSchema>(myIndexes, model);

export default model;
