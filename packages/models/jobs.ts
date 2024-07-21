export {};

import * as typegoose from "@typegoose/typegoose";
import { TopSectorSchema } from "./topSectors";
import { BetaUserSchema } from "./betaUsers";
import { index } from "@typegoose/typegoose";
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
    customName: "Job",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
@index({ "title.fr": 1 }, { name: "jobs_title-fr" })
@index({ "title.en": 1 }, { name: "jobs_title-en" })
export class JobSchema {
  @typegoose.prop()
  public type: "digital" | "hcr";
  @typegoose.prop()
  public href: string;
  @typegoose.prop()
  public title: object;
  @typegoose.prop()
  public frTitle: string;
  @typegoose.prop()
  public enTitle: string;
  @typegoose.prop({
    ref: () => "TopSector",
    index: { name: "jobs_topSectorId" },
  })
  public topSectorId: typegoose.Ref<TopSectorSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public usersIds: typegoose.Ref<BetaUserSchema>[];
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Job || typegoose.getModelForClass(JobSchema);

const myIndexes = {
  _id: { name: "_id_" },
  topSectorId: { name: "jobs_topSectorId" },
  "title.fr": { name: "jobs_title-fr" },
  "title.en": { name: "jobs_title-en" },
} as IndexList;

checkingIndexes<JobSchema>(myIndexes, model);

export default model;
