import { PaymentCreatedEvent, Publisher, Subjects } from "@ywtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
