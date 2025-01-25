import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private claims: { title: string, description: string }[] = [];

  constructor() {
    this.loadClaimsFromLocalStorage();
  }

  // Get all claims
  getClaims() {
    return this.claims;
  }

  // Add a new claim
  addClaim(claim: { title: string, description: string }) {
    this.claims.push(claim);
    this.saveClaimsToLocalStorage();
  }

  // Delete a claim by index
  deleteClaim(index: number) {
    this.claims.splice(index, 1);
    this.saveClaimsToLocalStorage();
  }

  // Load claims from local storage
  private loadClaimsFromLocalStorage() {
    const storedClaims = localStorage.getItem('claims');
    if (storedClaims) {
      this.claims = JSON.parse(storedClaims);
    }
  }
  updateClaim(index: number, updatedClaim: { title: string; description: string }) {
    this.claims[index] = updatedClaim;
    this.saveClaimsToLocalStorage();
  }

  // Save claims to local storage
  private saveClaimsToLocalStorage() {
    localStorage.setItem('claims', JSON.stringify(this.claims));
  }
}
