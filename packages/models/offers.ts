export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaCompanySchema } from "./betaCompanies";
import { CompetencySchema } from "./competencies";
import { TopSectorSchema } from "./topSectors";
import { JobSchema } from "./jobs";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
import * as OffreEmploiFT from "@youmeet/types/api/OffreEmploiFT";
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

  @typegoose.prop()
  public intitule: string;
  @typegoose.prop()
  public description: string;
  @typegoose.prop()
  public dateCreation: string;
  @typegoose.prop()
  public dateActualisation: string;
  @typegoose.prop()
  public lieuTravail: OffreEmploiFT.WorkLocationFT;
  @typegoose.prop()
  public romeCode: string;
  @typegoose.prop()
  public romeLibelle: string;
  @typegoose.prop()
  public appellationlibelle: string;
  @typegoose.prop()
  public entreprise: OffreEmploiFT.EnterpriseFT;
  @typegoose.prop()
  public typeContrat: string;
  @typegoose.prop()
  public typeContratLibelle: string;
  @typegoose.prop()
  public natureContrat: string;
  @typegoose.prop()
  public experienceExige: string;
  @typegoose.prop()
  public experienceLibelle: string;
  @typegoose.prop()
  public experienceCommentaire: string;
  @typegoose.prop()
  public formations: OffreEmploiFT.FormationFT[];
  @typegoose.prop()
  public langues: OffreEmploiFT.Required[];
  @typegoose.prop()
  public permis: OffreEmploiFT.Required[];
  @typegoose.prop()
  public competences: OffreEmploiFT.Entity[];
  @typegoose.prop()
  public salaire: OffreEmploiFT.SalaryFT[];
  @typegoose.prop()
  public dureeTravailLibelle: string;
  @typegoose.prop()
  public dureeTravailLibelleConverti: string;
  @typegoose.prop()
  public complementExercice: string;
  @typegoose.prop()
  public conditionExercice: string;
  @typegoose.prop()
  public alternance: boolean;
  @typegoose.prop()
  public contact: OffreEmploiFT.ContactFT;
  @typegoose.prop()
  public agence: OffreEmploiFT.AgencyFT;
  @typegoose.prop()
  public nombrePostes: number;
  @typegoose.prop()
  public accessibleTH: boolean;
  @typegoose.prop()
  public deplacementCode: string;
  @typegoose.prop()
  public deplacementLibelle: string;
  @typegoose.prop()
  public qualificationCode: string;
  @typegoose.prop()
  public qualificationLibelle: string;
  @typegoose.prop()
  public codeNAF: string;
  @typegoose.prop()
  public secteurActivite: string;
  @typegoose.prop()
  public secteurActiviteLibelle: string;
  @typegoose.prop()
  public qualitesProfessionnelles: OffreEmploiFT.ProfessionalQualityFT[];
  @typegoose.prop()
  public trancheEffectifEtab: string;
  @typegoose.prop()
  public origineOffre: OffreEmploiFT.OriginOfferFT;
  @typegoose.prop()
  public offresManqueCandidats: boolean;
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
