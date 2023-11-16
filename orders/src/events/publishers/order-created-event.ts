import { OrderCreatedEvent, Publisher, Subjects } from "@ywtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
