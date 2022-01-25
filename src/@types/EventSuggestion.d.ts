import {IEvent} from "./Event";

export class IEventSuggestion {
  id?: number;
  event: IEvent;
  position: number;
  title: string;
  url: string;
}
