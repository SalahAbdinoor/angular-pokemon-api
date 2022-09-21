import { Component, Input, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemon-data.model';
import { Pokemon } from 'src/app/models/pokermon.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css'],
})
export class PokemonListItemComponent implements OnInit {
  constructor(private trainerService: TrainerService) {}

  // input from list
  @Input() pokemon!: Pokemon;

  private _pokemonId: number = 0;
  private _pokemonImage: string = '';
  private _pokemonData: PokemonData | undefined;
  public isCaptured: boolean | undefined;

  get pokemonId(): number {
    return this._pokemonId;
  }

  set pokemonId(id: number) {
    this._pokemonId = id;
  }

  get pokemonImage(): string {
    return this._pokemonImage;
  }
  set pokemonImage(imageUrl: string) {
    this._pokemonImage = imageUrl;
  }

  get pokemonData(): PokemonData {
    return this._pokemonData!;
  }

  set pokemonData(pokemonData: PokemonData) {
    this.pokemonData = pokemonData;
  }

  ngOnInit(): void {
    // checks if pokemon is already captured
    this.isCaptured = this.trainerService.inCaught(this.pokemon.name);
    // gets id from pokemon and sets image
    this.fetchImageUrlByPokemonId(
      this.extractIdFromPokemonUrl(this.pokemon.url)
    );
  }

  /**
   * Submission -->
   * 1. Catch/Release pokemon
   * 2. Set isCaptured
   */
  public capturePokemonClick(): void {
    this.trainerService.catchReleasePokemon(this.pokemon);
    this.isCaptured = this.trainerService.inCaught(this.pokemon.name);
  }

  /**
   * helper function: Sets Id from pokemon to request image
   * @param id id of endpoint
   * @returns
   */
  public fetchImageUrlByPokemonId(id: number) {
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    this.pokemonImage = url;
  }

  /**
   * helper function extracts id from pokemon url
   * @param url
   * @returns
   */
  public extractIdFromPokemonUrl(url: string): number {
    // Matches las number from string === ID
    const matchLastNumbers: RegExp = /(\d+)(?!.*\d)/g;

    const id = Number(url!.match(matchLastNumbers)?.pop());

    this.pokemonId = id;

    return id;
  }
}
