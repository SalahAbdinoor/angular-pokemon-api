import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokermon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {
  constructor(private trainerService: TrainerService) {}

  public get emptyList(): Pokemon[] | undefined {
    return this.trainerService.trainer?.pokemon;
  }
  public get trainer(): Trainer | undefined {
    return this.trainerService.trainer;
  }

  public get caughtPokemons(): Pokemon[] | undefined {
    return this.trainerService.trainer?.pokemon;
  }
}
