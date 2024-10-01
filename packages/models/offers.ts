export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaCompanySchema } from "./betaCompanies";
import { CompetencySchema } from "./competencies";
import { TopSectorSchema } from "./topSectors";
import { JobSchema } from "./jobs";
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
    customName: "Offer",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class OfferSchema {
  @typegoose.prop({ index: { name: "offers_slug", unique: true } })
  public slug: string;
  @typegoose.prop()
  public extension: string;
  @typegoose.prop()
  public content: string;
  @typegoose.prop()
  public profileSearched: string;
  @typegoose.prop()
  public contractType: string;
  @typegoose.prop()
  public remote: string;
  @typegoose.prop({ index: { name: "offers_location" } })
  public location: string;
  @typegoose.prop({ default: [], ref: () => "Competency" })
  public requirementsIds: typegoose.Ref<CompetencySchema>[];
  @typegoose.prop()
  public revenue: number;
  @typegoose.prop()
  public limitDate: Date;
  @typegoose.prop()
  public authorName: string;
  @typegoose.prop({ default: false })
  public rebroadcast: boolean;
  @typegoose.prop()
  public companyName: string;
  @typegoose.prop()
  public companyLogo: string;
  @typegoose.prop()
  public authorEmail: string;
  @typegoose.prop({
    ref: () => "TopSector",
    index: { name: "offers_sectorId" },
  })
  public sectorId: typegoose.Ref<TopSectorSchema>;
  @typegoose.prop({ ref: () => "Job", index: { name: "offers_jobId" } })
  public jobId: typegoose.Ref<JobSchema>;
  @typegoose.prop()
  public jobDescriptionLink: string;
  @typegoose.prop()
  public authorInterviewLink: string;
  @typegoose.prop({ ref: () => "BetaUser" })
  public authorId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ default: [], ref: () => "BetaUser" })
  public candidatesIds: typegoose.Ref<BetaUserSchema>[];
  @typegoose.prop({
    ref: () => "BetaCompany",
    index: { name: "offers_companyId" },
  })
  public companyId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop()
  public generated: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Offer || typegoose.getModelForClass(OfferSchema);

const myIndexes = {
  _id: { name: "_id_" },
  companyId: { name: "offers_companyId" },
  jobId: { name: "offers_jobId" },
  sectorId: { name: "offers_sectorId" },
  location: { name: "offers_location" },
  slug: { name: "offers_slug", unique: true },
} as IndexList;

checkingIndexes<OfferSchema>(myIndexes, model);

export default model;
