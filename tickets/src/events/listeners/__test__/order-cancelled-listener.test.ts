import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@ywtickets/common";
import { Ticket } from "../../../models/tickets";
import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  // create an instance of listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create new ticket
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "The Weeknnds",
    price: 300,
    userId: "pasti",
  });
  await ticket.save();

  // create fake date event
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

it("ack the msg", async () => {
  const { listener, ticket, data, msg, orderId } = await setup();
  await listener.onMessage(data, msg);
  const UpdatedTicket = await Ticket.findById(ticket.id);
  expect(UpdatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
});

it("updated enevet has been called", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
