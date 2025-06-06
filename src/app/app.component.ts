import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, MatToolbar, MatIcon, MatButtonModule]
})
export class AppComponent implements OnDestroy {

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }
  private router = inject(Router);
  private logoutSubscription: Subscription | null = null;
 	loginService = inject(LoginService);

 	logout() {
 		this.logoutSubscription = this.loginService.logout().subscribe({
 			next: _ => { this.navigateToLogin(); },
 			error: _ => { this.navigateToLogin(); }
 		})
 	}

 	navigateToLogin() {
 		this.router.navigate(['login']);
 	}

 	navigateHome() {
 		this.router.navigate(['home']);
 	}
}
