import {IEventSuggestion} from "./EventSuggestion";
import {IUser} from "./User";

export class Vote {
  id?: number;
  eventSuggestion: IEventSuggestion;
  user: IUser;
}
