import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokermon.model';
import { RootObject } from '../models/root-object.model';

const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemons: any = [];
  private _error: string = '';
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  set pokemons(pokemons: Pokemon[]) {
    if (!this._pokemons) {
      this._pokemons = pokemons;
    }
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * Makes a request for all the pokemons
   * @returns
   */
  public findAllPokemons(): void {
    // Generation III
    const limit: string = '?limit=135';
    const offset: string = '&offset=251';

    // Stops multiple requests once pokemons have been loaded
    if (this._pokemons.length > 0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http
      .get<RootObject[]>(`${apiPokemons}${limit}&${offset}`)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (rootObject: RootObject[]) => {
          this.setPokemonsResult(rootObject);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
  /**
   * method extracts results-array with pokemon from root-object
   *
   * @param rootObject Body from API-call
   */
  private setPokemonsResult(rootObject: RootObject[]): void {
    // Save to storage session <Optional>
    this._pokemons = Object.values(rootObject)[3];
  }
}
