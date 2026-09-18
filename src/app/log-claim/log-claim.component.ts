import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from '../claims.service';

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

@Component({
  selector: 'app-log-claim',
  templateUrl: './log-claim.component.html'
})
export class LogClaimComponent {
  constructor(private claimsService: ClaimsService, private router: Router) {}

  // Step State: 'verify' | 'form' | 'claims'
  currentStep: 'verify' | 'form' | 'claims' = 'verify';
  isScanning = false;

  // Verified User Identity
  verifiedUser = {
    fullName: 'Alex Mercer',
    idNumber: 'ID-9082-331X',
    verifiedAt: ''
  };

  // Claim Form Inputs
  claimInput = {
    policyNumber: '',
    incidentType: 'Vehicle',
    claimAmount: null as number | null,
    resolution: 'Reimbursement',
    claimDescription: ''
  };

  // Submitted Claims Database
  submittedClaims: ClaimRecord[] = [];

  // Step 1: Simulate Biometric / Identity Check
  verifyIdentity() {
    this.isScanning = true;
    setTimeout(() => {
      this.isScanning = false;
      this.verifiedUser.verifiedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.currentStep = 'form';
    }, 1200);
  }

  // Step 2: Submit and Map Details to Claims Dashboard
  submitClaim() {
    if (!this.claimInput.policyNumber || !this.claimInput.claimAmount || !this.claimInput.claimDescription) {
      return;
    }

    const newClaim: ClaimRecord = {
      id: 'CLM-' + Math.floor(100000 + Math.random() * 900000),
      policyNumber: this.claimInput.policyNumber,
      incidentType: this.claimInput.incidentType,
      claimAmount: Number(this.claimInput.claimAmount),
      resolution: this.claimInput.resolution,
      claimDescription: this.claimInput.claimDescription,
      dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Under Review',
      verifiedUser: this.verifiedUser.fullName
    };

    this.claimsService.addClaim({
      title: `${newClaim.incidentType} claim - ${newClaim.policyNumber}`,
      description: `${newClaim.claimDescription} Claim amount: $${newClaim.claimAmount}. Preferred resolution: ${newClaim.resolution}.`
    });
    this.submittedClaims.unshift(newClaim);
    this.router.navigate(['/view-claims']);
  }

  // Allow Logging Another Claim
  startNewClaim() {
    this.claimInput = {
      policyNumber: '',
      incidentType: 'Vehicle',
      claimAmount: null,
      resolution: 'Reimbursement',
      claimDescription: ''
    };
    this.currentStep = 'form';
  }
}
