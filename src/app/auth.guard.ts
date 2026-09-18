import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClaimService } from './claims.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private claimService: ClaimService, private router: Router) {}

  canActivate(): boolean {
    if (this.claimService.isUserVerified()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
