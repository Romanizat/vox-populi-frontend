import {IEvent} from "./Event";
import {Vote} from "./vote.model";

export class IEventSuggestion {
  id?: number;
  event: IEvent;
  position: number;
  title: string;
  url: string;
  votes: Vote[];
  creatorUserId?: number;
}
