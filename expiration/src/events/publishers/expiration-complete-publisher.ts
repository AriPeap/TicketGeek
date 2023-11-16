import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ywtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
