export {};

import * as typegoose from "@typegoose/typegoose";
import { CustomisationSchema } from "./customisations";
import mongoose from "mongoose";
import { BetaUserSchema } from "./betaUsers";
import type { Phone } from "./types";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Lead",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class LeadSchema {
  @typegoose.prop()
  public phone: Phone;
  @typegoose.prop()
  public email: string;
  @typegoose.prop()
  public name: string;
  @typegoose.prop()
  public type: string;
  @typegoose.prop()
  public contacted: number;
  @typegoose.prop()
  public prospected: number;
  @typegoose.prop()
  public fr: boolean;
  @typegoose.prop()
  public linkedinProfileId: string;
  @typegoose.prop()
  public token: string;
  @typegoose.prop()
  public trialOffering: Date;
  @typegoose.prop({ ref: () => "Customisation" })
  public customisationId: typegoose.Ref<CustomisationSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public parentId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model = mongoose.models.Lead || typegoose.getModelForClass(LeadSchema);

export default model;
