import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
  TicketCreatedEvent,
} from "@ywtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = "orders-service";
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { id, orderId, stripeId } = data;

    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order Not Found!");

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();
    msg.ack();
  }
}
