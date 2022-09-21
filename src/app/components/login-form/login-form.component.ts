import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  // Emit events to the parent. On login
  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
  ) {}

  /**
   * handles submission for login -> set trainer in state/session
   * @param LoginForm
   */
  public loginSubmit(LoginForm: NgForm): void {
    //username from login form
    const { username } = LoginForm.value;

    // login funtion from login service
    this.loginService.login(username).subscribe({
      next: (trainer: Trainer | undefined) => {
        if (trainer) {
          // sets trainer
          this.trainerService.trainer = trainer;
          this.login.emit();
        } else return;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }
}
