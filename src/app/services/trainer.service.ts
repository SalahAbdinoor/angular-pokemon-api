import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from '../enums/storage-keys';
import { Pokemon } from '../models/pokermon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';
import { TrainerPokemonService } from './trainer-pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor(
    private router: Router,
    private trainerPokemonService: TrainerPokemonService
  ) {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  /**
   * Checks to see if pokemon exists within trainers list
   * @param pokemonName
   * @returns
   */
  public inCaught(pokemonName: string): boolean {
    if (this.trainer && pokemonName) {
      return Boolean(
        this.trainer?.pokemon.find(
          (pokemon: Pokemon) => pokemon.name === pokemonName
        )
      );
    }
    return false;
  }

  /**
   * If pokemon is caught --> release
   * If pokemon is NOT caught --> catch
   * @param pokemon pokemon in question
   */
  public catchReleasePokemon(pokemon: Pokemon): void {
    if (this._trainer) {
      // Check if trainer has caught pokemon
      if (!this.pokemonExistsInTrainer(pokemon)) {
        // Catch pokemon
        this.trainer?.pokemon.push(pokemon);
      } else {
        // Release pokemon
        this._trainer.pokemon = this._trainer.pokemon.filter(
          (caughtPokemonn) => caughtPokemonn.name !== pokemon.name
        );
      }

      // Update trainer's pokemon list oin API
      this.trainerPokemonService
        .patchPokemonsInTrainerList(this._trainer)
        .subscribe({
          next: (updatedTrainer: Trainer) => {
            // Triggers event to reload component view
            this.trainer = updatedTrainer;
          },
          error: (error: HttpErrorResponse) => {
            console.error('ERROR', error.message);
          },
        });
    }
  }

  /**
   * This helper function checks to see if pokemon
   * already exists within the trainers pokemon list
   *
   * @param newPokemon pokemon to compare with list
   * @returns returns Pokemon if pokemon DOES exist || returns undefined if pokemon DOES NOT exist
   */
  pokemonExistsInTrainer(newPokemon: Pokemon): Pokemon | undefined {
    return this.trainer?.pokemon.find(
      (caughtPokemon) => caughtPokemon.name === newPokemon.name
    );
  }

  /**
   * log out: Deletes storage key and navigates to login
   */
  public logOutTrainer(): void {
    if (this._trainer) {
      StorageUtil.storageRemove(StorageKeys.Trainer);
      this._trainer = undefined;
      this.router.navigateByUrl('/landing');
    }
  }
}
