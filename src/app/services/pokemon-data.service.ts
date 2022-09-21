import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonData } from '../models/pokemon-data.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private _data!: PokemonData;
  private _error: string = '';

  get data(): PokemonData {
    return this._data;
  }

  set data(pokemonData: PokemonData) {
    this._data = pokemonData;
  }

  get error(): string {
    return this._error;
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Makes request for pokemon data based on pokemon URL + ID
   * and sets pokemonData
   * @param apiUrl
   * @returns
   */
  public fetchPokemonData(apiUrl: string) {
    // Stops multiple requests once guitars have been loaded

    return this.http
      .get<PokemonData>(apiUrl)
      .pipe()
      .subscribe({
        next: (pokemonData: PokemonData) => {
          // method extracts results-array with pokemon from root-object
          this._data = pokemonData;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
}
