import { Publisher, Subjects, TicketUpdatedEvent } from "@ywtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
