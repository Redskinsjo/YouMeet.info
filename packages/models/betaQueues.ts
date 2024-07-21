export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import mongoose from "mongoose";
import { checkingIndexes } from "@youmeet/utils/checkingIndexes";
import { IndexList } from "@youmeet/types/IndexList";
import { CustomisationSchema } from "./customisations";
import { OfferSchema } from "./offers";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaQueue",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaQueueSchema {
  @typegoose.prop({ default: "pending", index: { name: "betaqueues_status" } })
  public status: string;
  @typegoose.prop({
    ref: () => "BetaUser",
  })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "Customisation" })
  public customisationId: typegoose.Ref<CustomisationSchema>;
  @typegoose.prop({ ref: () => "Offer" })
  public offerTargetId: typegoose.Ref<OfferSchema>;
  @typegoose.prop()
  public system: string;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaQueue || typegoose.getModelForClass(BetaQueueSchema);

const myIndexes = {
  _id: { name: "_id_" },
  status: { name: "betaqueues_status" },
} as IndexList;

checkingIndexes<BetaQueueSchema>(myIndexes, model);

export default model;
