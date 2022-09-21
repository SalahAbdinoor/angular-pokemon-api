import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';
import { TrainerService } from './trainer.service';

// Environment variables
let { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private readonly http: HttpClient,
    private readonly currentTrainer: TrainerService
  ) {}

  /**
   * Checks if user exists:
   * If exists --> get user and login
   * Else --> create user and login
   * @param username
   * @returns
   */
  public login(username: string): Observable<Trainer | undefined> {
    return this.checkUsername(username).pipe(
      switchMap((trainer: Trainer | undefined) => {
        if (trainer === undefined) {
          // user does not exist
          return this.createTrainer(username);
        }
        return of(trainer);
      })
    );
  }

  /**
   * Check if trainer exists
   *
   * @param username name of Trainer
   * @returns <Trainer> IF trainer DOES exists || <undefined> IF trainer DOES NOT exist
   */
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`).pipe(
      // RxJS Operators
      map((response: Trainer[]) => response.pop())
    );
  }

  /**
   * creates a trainer
   *
   * @param username name of created trainer
   * @returns <Trainer>
   */
  private createTrainer(username: string): Observable<Trainer> {
    // user
    const trainer = {
      username,
      pokemon: [],
    };

    // headers -> API Key
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey,
    });

    // POST - Create items on the server
    return this.http.post<Trainer>(apiTrainers, trainer, { headers });
  }
}
