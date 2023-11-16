import { OrderCreatedEvent, OrderStatus } from "@ywtickets/common";
import { Ticket } from "../../../models/tickets";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // create an instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create new ticket
  const ticket = Ticket.build({
    title: "The Weeknnds",
    price: 300,
    userId: "pasti",
  });
  await ticket.save();

  // create fake date event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "asjcn",
    expiresAt: "asjcn",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("set the userId of ticket", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const UpdatedTicket = await Ticket.findById(ticket.id);
  expect(UpdatedTicket!.orderId).toEqual(data.id);
});

it("ack the msg", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it("updated enevet has been called", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
