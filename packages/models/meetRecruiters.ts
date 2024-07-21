export {};

import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
import type { Phone } from "./types";
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
    customName: "MeetRecruiter",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class MeetRecruiterSchema {
  @typegoose.prop()
  public firstname: string;
  @typegoose.prop()
  public lastname: string;
  @typegoose.prop()
  public fullname: string;
  @typegoose.prop()
  public linkedinProfileId: string;
  @typegoose.prop({ index: { name: "meetrecruiters_email", unique: true } })
  public email: string;
  @typegoose.prop()
  public phone: Phone;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.MeetRecruiter ||
  typegoose.getModelForClass(MeetRecruiterSchema);

const myIndexes = {
  _id: { name: "_id_" },
  email: { name: "meetrecruiters_email", unique: true },
} as IndexList;

checkingIndexes<MeetRecruiterSchema>(myIndexes, model);

export default model;
