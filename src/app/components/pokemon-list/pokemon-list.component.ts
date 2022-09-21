import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokermon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  constructor() {}

  // allows us to pass information as input to the component
  @Input() pokemons: Pokemon[] = [];
}
