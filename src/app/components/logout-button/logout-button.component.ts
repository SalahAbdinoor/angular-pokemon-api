import { Component } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  constructor(private trainerService: TrainerService) {}

  /**
   * Calls trainer service -> logout function (deletes storage key & reroutes)
   */
  public logout(): void {
    if (this.trainerService.trainer) {
      this.trainerService.logOutTrainer();
    }
  }
}
