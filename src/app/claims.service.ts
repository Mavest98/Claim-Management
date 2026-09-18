import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClaimRecord {
  id: string;
  policyNumber: string;
  incidentType: string;
  claimAmount: number;
  resolution: string;
  claimDescription: string;
  dateSubmitted: string;
  status: string;
  verifiedUser: string;
}

export interface UserIdentity {
  fullName: string;
  idNumber: string;
  isVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  // Identity State
  private userSubject = new BehaviorSubject<UserIdentity>({
    fullName: 'Alex Mercer',
    idNumber: 'ID-9082-331X',
    isVerified: false
  });
  currentUser$ = this.userSubject.asObservable();

  // Claims Repository State
  private claimsSubject = new BehaviorSubject<ClaimRecord[]>([
    {
      id: 'CLM-892104',
      policyNumber: 'POL-109283',
      incidentType: 'Vehicle',
      claimAmount: 1850,
      resolution: 'Reimbursement',
      claimDescription: 'Rear bumper collision at low speed during heavy rain.',
      dateSubmitted: 'Sep 14, 2026',
      status: 'Approved',
      verifiedUser: 'Alex Mercer'
    }
  ]);
  claims$ = this.claimsSubject.asObservable();

  getClaims() {
    return this.claimsSubject.value.map((claim) => ({
      ...claim,
      title: `${claim.incidentType} claim - ${claim.policyNumber}`,
      description: claim.claimDescription
    }));
  }

  // Mark User as Verified
  authenticateUser() {
    const current = this.userSubject.value;
    this.userSubject.next({ ...current, isVerified: true });
  }

  logout(): void {
    const current = this.userSubject.value;
    this.userSubject.next({ ...current, isVerified: false });
  }

  // Get Current Verification Status
  isUserVerified(): boolean {
    return this.userSubject.value.isVerified;
  }

  // Log a New Claim to Global Registry
  addClaim(claimData: Omit<ClaimRecord, 'id' | 'dateSubmitted' | 'status' | 'verifiedUser'> | { title: string; description: string }) {
    const normalizedClaim: Omit<ClaimRecord, 'id' | 'dateSubmitted' | 'status' | 'verifiedUser'> = 'title' in claimData
      ? {
          policyNumber: claimData.title,
          incidentType: 'Claim',
          claimAmount: 0,
          resolution: 'Review required',
          claimDescription: claimData.description
        }
      : claimData;
    const newRecord: ClaimRecord = {
      ...normalizedClaim,
      id: 'CLM-' + Math.floor(100000 + Math.random() * 900000),
      dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
      verifiedUser: this.userSubject.value.fullName
    };

    const currentList = this.claimsSubject.value;
    this.claimsSubject.next([newRecord, ...currentList]);
  }

  updateClaim(index: number, updatedClaim: { title: string; description: string }): void {
    const currentList = [...this.claimsSubject.value];
    const existingClaim = currentList[index];

    if (!existingClaim) {
      return;
    }

    currentList[index] = {
      ...existingClaim,
      policyNumber: updatedClaim.title,
      claimDescription: updatedClaim.description
    };
    this.claimsSubject.next(currentList);
  }

  deleteClaim(index: number): void {
    const currentList = [...this.claimsSubject.value];
    currentList.splice(index, 1);
    this.claimsSubject.next(currentList);
  }
}

export { ClaimService as ClaimsService };