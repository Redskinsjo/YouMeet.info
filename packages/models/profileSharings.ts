export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { BetaCompanySchema } from "./betaCompanies";
import { OfferSchema } from "./offers";
import { VideoSchema } from "./videos";
import mongoose from "mongoose";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;
@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "ProfileSharing",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class ProfileSharingSchema {
  @typegoose.prop({ ref: () => "BetaUser" })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaCompany" })
  public targetId: typegoose.Ref<BetaCompanySchema>;
  @typegoose.prop({ ref: () => "Offer" })
  public offerTargetId: typegoose.Ref<OfferSchema>;
  @typegoose.prop({ ref: () => "Video" })
  public videoId: typegoose.Ref<VideoSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.ProfileSharing ||
  typegoose.getModelForClass(ProfileSharingSchema);

export default model;
