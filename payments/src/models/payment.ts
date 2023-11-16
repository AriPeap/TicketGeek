import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type PaymentAttrs = {
  orderId: string;
  stripeId: string;
};

type PaymentDoc = mongoose.Document & {
  orderId: string;
  stripeId: string;
};

type PaymentModel = mongoose.Model<PaymentDoc> & {
  build(attrs: PaymentAttrs): PaymentDoc;
};

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// PaymentSchema.set("versionKey", "version");
// PaymentSchema.plugin(updateIfCurrentPlugin);

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  PaymentSchema
);

export { Payment };
