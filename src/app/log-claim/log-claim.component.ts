import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-log-claim',
  templateUrl: './log-claim.component.html'
})
export class LogClaimComponent {
  isAuthenticated: boolean = false; // Tracks authentication status
  policyNumber: string = ''; // Stores policy number input
  claimDescription: string = ''; // Stores claim description input
  successMessage: string = ''; // Message after claim submission
  scanning: boolean = false; // Indicates whether the scanning is in progress

  constructor(private claimsService: ClaimsService, private router: Router) {}

  // Simulate biometric authentication
  
  authenticateUser(): void {
    setTimeout(() => {
      alert('Biometric authentication successful!');
      this.isAuthenticated = true; // Update authentication status
    }, 2000); // Simulate a delay for authentication
  
    // Simulate a scanning process
    setTimeout(() => {
      this.scanning = false; // Reset scanning to false after the process
      alert('Authentication Complete!');
    }, 3000); // 3 seconds for demo purposes
  }
  // Submit the claim
  submitClaim(): void {
    if (this.policyNumber && this.claimDescription) {
      const newClaim = {
        title: this.policyNumber,
        description: this.claimDescription,
      };

      // Add the claim using the ClaimsService
      this.claimsService.addClaim(newClaim);

      // Display success message
      this.successMessage = 'Claim submitted successfully! Redirecting to View Claims...';

      // Clear the form
      this.policyNumber = '';
      this.claimDescription = '';

      // Redirect to the View Claims page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/view-claims']);
      }, 2000);
    }
  }
}
