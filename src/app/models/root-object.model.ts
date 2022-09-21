import { Pokemon } from './pokermon.model';

export interface RootObject {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
