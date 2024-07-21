export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaWhatsappThreadSchema } from "./betaWhatsappThreads";
import mongoose from "mongoose";
import { BetaWhatsappExchangeSchema } from "./betaWhatsappExchanges";
import { BetaUserSchema } from "./betaUsers";
import { VideoSchema } from "./videos";
mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

@typegoose.modelOptions({
  schemaOptions: {
    timestamps: true,
    id: true,
  },
  options: {
    automaticName: false,
    customName: "BetaWhatsappResponse",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaWhatsappResponseSchema {
  @typegoose.prop()
  public type: string;
  @typegoose.prop()
  public content: string;
  @typegoose.prop({ ref: () => "BetaUser" })
  public userId: typegoose.Ref<BetaUserSchema>;
  @typegoose.prop({ ref: () => "Video" })
  public videoId: typegoose.Ref<VideoSchema>;
  @typegoose.prop({ ref: () => "BetaWhatsappThread" })
  public threadId: typegoose.Ref<BetaWhatsappThreadSchema>;
  @typegoose.prop({ ref: () => "BetaWhatsappExchange" })
  public exchangeId: typegoose.Ref<BetaWhatsappExchangeSchema>;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaWhatsappResponse ||
  typegoose.getModelForClass(BetaWhatsappResponseSchema);

export default model;
