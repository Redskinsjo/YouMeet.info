export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
import { OfferSchema } from "./offers";
import mongoose from "mongoose";
import { IndexList } from "@youmeet/types/IndexList";
import { checkingIndexes } from "@youmeet/utils/basics/checkingIndexes";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "Favorite",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class FavoriteSchema {
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "favorites_originId" },
  })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({
    ref: () => "BetaUser",
    index: { name: "favorites_targetId" },
  })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "Offer" })
  public offerTargetId: typegoose.Ref<OfferSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Favorite || typegoose.getModelForClass(FavoriteSchema);

const myIndexes = {
  _id: { name: "_id_" },
  targetId: { name: "favorites_targetId" },
  originId: { name: "favorites_originId" },
} as IndexList;

checkingIndexes<FavoriteSchema>(myIndexes, model);

export default model;
