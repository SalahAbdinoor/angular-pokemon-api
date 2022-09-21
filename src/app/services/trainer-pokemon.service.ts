import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class TrainerPokemonService {
  constructor(private http: HttpClient) {}

  /**
   * Sends the updated trainers pokemon list to the API
   * @param updatedTrainer
   * @returns
   */
  public patchPokemonsInTrainerList(
    updatedTrainer: Trainer
  ): Observable<Trainer> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.patch<Trainer>(
      `${apiTrainers}/${updatedTrainer.id}`,
      {
        //  Pokemon is saved in the wrong format
        pokemon: [...updatedTrainer.pokemon], // gets updated with new user onFavourit
      },
      {
        headers,
      }
    );
  }
}
