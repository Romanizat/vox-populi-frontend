import {IUser} from "./User";
import {IEvent} from "./Event";

export class IEventParticipant {
  id: number;
  user: IUser;
  event: IEvent;
  organizer: boolean;
}
