export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import mongoose from "mongoose";
import { BetaCompanySchema } from "./betaCompanies";
import { ProfileSharingSchema } from "./profileSharings";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "SharingRefusal",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class SharingRefusalSchema {
  @typegoose.prop()
  public reason: string;
  @typegoose.prop()
  public type: Date;
  @typegoose.prop({
    ref: () => "BetaCompany",
  })
  public originId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop({
    ref: () => "BetaUser",
  })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({
    ref: () => "ProfileSharing",
  })
  public sharingId: typegoose.Ref<ProfileSharingSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.SharingRefusal ||
  typegoose.getModelForClass(SharingRefusalSchema);

export default model;
