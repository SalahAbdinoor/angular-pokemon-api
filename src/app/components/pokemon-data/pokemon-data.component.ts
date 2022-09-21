import { Component, Input } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemon-data.model';
import { Pokemon } from 'src/app/models/pokermon.model';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.css'],
})
export class PokemonDataComponent {
  @Input() pokemonId!: number;
  @Input() pokemon!: Pokemon;

  private _data!: PokemonData;
  private _show: boolean = false;

  get data(): PokemonData {
    return this._data;
  }

  set data(pokemonData: PokemonData) {
    this._data = pokemonData;
  }

  get show(): boolean {
    return this._show;
  }

  set show(show: boolean) {
    this._show = show;
  }

  constructor(private readonly pokemonDataService: PokemonDataService) {}

  /**
   * Shows data when pressing "show more.../show less..."
   */
  public handleShowData() {
    if (this.data === undefined) {
      this.pokemonDataService.fetchPokemonData(this.pokemon.url);

      // Allows data to come before trying to display data in HTML
      setTimeout(() => {
        this.data = this.pokemonDataService.data;
      }, 200);
    }

    if (this.show) this.show = false;
    else this.show = true;
  }
}
