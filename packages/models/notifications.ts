export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaUserSchema } from "./betaUsers";
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
    customName: "Notification",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class NotificationSchema {
  @typegoose.prop({ default: "pending" })
  public status: string;
  @typegoose.prop()
  public content: string;
  @typegoose.prop()
  public concernedId: string;
  @typegoose.prop({ index: { name: "notifications_type" } })
  public type: string;
  @typegoose.prop({
    ref: () => "BetaUser",
  })
  public originId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "BetaUser" })
  public targetId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.Notification ||
  typegoose.getModelForClass(NotificationSchema);

const myIndexes = {
  _id: { name: "_id_" },
  type: { name: "notifications_type" },
} as IndexList;

checkingIndexes<NotificationSchema>(myIndexes, model);

export default model;
