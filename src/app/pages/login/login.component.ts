import { parseSourceFile } from '@angular/cdk/schematics';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Credentials, LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule],
  // providers: [provideHttpClient()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription : Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });

  invalidCredentials = false;

  login() {
    console.log(this.loginFormGroup.value);
    this.loginSubscription = this.loginService.login(this.loginFormGroup.value as Credentials)
    .subscribe({
      //Cas ou on reçoit une valeur
      next : (result: User | null | undefined) => {
        this.navigateHome();

        //Bypass du login pour continuer le tuto
        if(this.loginFormGroup.value.username === 'test' && this.loginFormGroup.value.password === 'test') {
          this.navigateHome();
        }
      },
      error: error => {
        this.invalidCredentials = true;
      }
    })
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
