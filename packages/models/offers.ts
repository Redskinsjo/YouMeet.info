export {};

import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaCompanySchema } from "./betaCompanies";
import { CompetencySchema } from "./competencies";
import { TopSectorSchema } from "./topSectors";
import { JobSchema } from "./jobs";
import mongoose from "mongoose";
import * as OffreEmploiFT from "@youmeet/types/api/OffreEmploiFT";
import { uri } from "../functions/imports";
mongoose.connect(`${process.env.MONGODB_URI}`);

console.log(uri);

@modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Offer",
    allowMixed: Severity.ALLOW,
  },
})
@index({ slug: 1 }, { unique: true })
@index({ location: 1 })
@index({ sectorId: 1 })
@index({ jobId: 1 })
@index({ companyId: 1 })
@index({ intitule: 1 })
@index({ "lieuTravail.codePostal": 1 })
export class OfferSchema {
  @prop({ index: true })
  public slug: string;
  @prop()
  public extension: string;
  @prop()
  public content: string;
  @prop()
  public profileSearched: string;
  @prop()
  public contractType: string;
  @prop()
  public remote: string;
  @prop({ index: true })
  public location: string;
  @prop({ default: [], ref: () => "Competency" })
  public requirementsIds: Ref<CompetencySchema>[];
  @prop()
  public revenue: number;
  @prop()
  public limitDate: Date;
  @prop()
  public authorName: string;
  @prop({ default: false })
  public rebroadcast: boolean;
  @prop()
  public companyName: string;
  @prop()
  public companyLogo: string;
  @prop()
  public authorEmail: string;
  @prop({
    index: true,
    ref: () => "TopSector",
  })
  public sectorId: Ref<TopSectorSchema>;
  @prop({ index: true, ref: () => "Job" })
  public jobId: Ref<JobSchema>;
  @prop()
  public jobDescriptionLink: string;
  @prop()
  public authorInterviewLink: string;
  @prop({ ref: () => "BetaUser" })
  public authorId: Ref<BetaUserSchema>;
  @prop({ default: [], ref: () => "BetaUser" })
  public candidatesIds: Ref<BetaUserSchema>[];
  @prop({
    index: true,
    ref: () => "BetaCompany",
  })
  public companyId: Ref<BetaCompanySchema>;
  @prop()
  public generated: string;
  @prop()
  public createdAt: Date;
  @prop()
  public updatedAt: Date;

  @prop({ index: true })
  public intitule: string;
  @prop()
  public description: string;
  @prop()
  public dateCreation: string;
  @prop()
  public dateActualisation: string;
  @prop({ index: true })
  public lieuTravail: OffreEmploiFT.WorkLocationFT;
  @prop()
  public romeCode: string;
  @prop()
  public romeLibelle: string;
  @prop()
  public appellationlibelle: string;
  @prop()
  public entreprise: OffreEmploiFT.EnterpriseFT;
  @prop()
  public typeContrat: string;
  @prop()
  public typeContratLibelle: string;
  @prop()
  public natureContrat: string;
  @prop()
  public experienceExige: string;
  @prop()
  public experienceLibelle: string;
  @prop()
  public experienceCommentaire: string;
  @prop()
  public formations: OffreEmploiFT.FormationFT[];
  @prop()
  public langues: OffreEmploiFT.Required[];
  @prop()
  public permis: OffreEmploiFT.Required[];
  @prop()
  public competences: OffreEmploiFT.Entity[];
  @prop()
  public salaire: OffreEmploiFT.SalaryFT[];
  @prop()
  public dureeTravailLibelle: string;
  @prop()
  public dureeTravailLibelleConverti: string;
  @prop()
  public complementExercice: string;
  @prop()
  public conditionExercice: string;
  @prop()
  public alternance: boolean;
  @prop()
  public contact: OffreEmploiFT.ContactFT;
  @prop()
  public agence: OffreEmploiFT.AgencyFT;
  @prop()
  public nombrePostes: number;
  @prop()
  public accessibleTH: boolean;
  @prop()
  public deplacementCode: string;
  @prop()
  public deplacementLibelle: string;
  @prop()
  public qualificationCode: string;
  @prop()
  public qualificationLibelle: string;
  @prop()
  public codeNAF: string;
  @prop()
  public secteurActivite: string;
  @prop()
  public secteurActiviteLibelle: string;
  @prop()
  public qualitesProfessionnelles: OffreEmploiFT.ProfessionalQualityFT[];
  @prop()
  public trancheEffectifEtab: string;
  @prop()
  public origineOffre: OffreEmploiFT.OriginOfferFT;
  @prop()
  public offresManqueCandidats: boolean;
}

const model = getModelForClass(OfferSchema);

model.ensureIndexes();
model.syncIndexes();

export default model;
