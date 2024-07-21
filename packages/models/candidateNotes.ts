export {};

import * as typegoose from "@typegoose/typegoose";
import mongoose from "mongoose";
import { BetaCandidateSchema } from "./betaCandidates";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "CandidateNote",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class CandidateNoteSchema {
  @typegoose.prop()
  public content: string;
  @typegoose.prop()
  public appreciation: number;
  @typegoose.prop({ ref: () => "BetaCandidate" })
  public candidateId: typegoose.Ref<BetaCandidateSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.CandidateNote ||
  typegoose.getModelForClass(CandidateNoteSchema);

export default model;
