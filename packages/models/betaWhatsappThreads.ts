export {};

import * as typegoose from "@typegoose/typegoose";
import { BetaQueueSchema } from "./betaQueues";
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
    customName: "BetaWhatsappThread",
    allowMixed: typegoose.Severity.ALLOW,
  },
})
export class BetaWhatsappThreadSchema {
  @typegoose.prop()
  public chatId: string;
  @typegoose.prop({ ref: () => "BetaQueue" })
  public queueId: typegoose.Ref<BetaQueueSchema>;
  @typegoose.prop({ default: false })
  public terminated: boolean;
  @typegoose.prop()
  public createdAt: Date;
  @typegoose.prop()
  public updatedAt: Date;
}

const model =
  mongoose.models.BetaWhatsappThread ||
  typegoose.getModelForClass(BetaWhatsappThreadSchema);

export default model;
