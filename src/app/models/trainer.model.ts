import { Pokemon } from './pokermon.model';

export interface Trainer {
  id: number;
  username: string;
  pokemon: Pokemon[];
}
