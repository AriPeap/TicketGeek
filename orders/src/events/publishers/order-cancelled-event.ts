import { OrderCancelledEvent, Publisher, Subjects } from "@ywtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
