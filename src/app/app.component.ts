import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimService } from './claims.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'claims-app';

  constructor(private claimService: ClaimService, private router: Router) {}

  get showNavigation(): boolean {
    return this.router.url !== '/login';
  }

  logout(): void {
    this.claimService.logout();
    this.router.navigate(['/login']);
  }
}
