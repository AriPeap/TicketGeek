import { OrderStatus } from "@ywtickets/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type OrderAttrs = {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};

type OrderDoc = mongoose.Document & {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};

type OrderModel = mongoose.Model<OrderDoc> & {
  build(attrs: OrderAttrs): OrderDoc;
};

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
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

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
