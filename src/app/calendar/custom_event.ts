import { CalendarEvent } from 'angular-calendar';

export interface CustomEvent extends CalendarEvent {
  id: number;
  type: string;
}
