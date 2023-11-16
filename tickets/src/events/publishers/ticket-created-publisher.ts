import { Publisher, Subjects, TicketCreatedEvent } from "@ywtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
