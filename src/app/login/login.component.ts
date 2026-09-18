import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimService } from '../claims.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  scanning: boolean = false;
  showModal: boolean = false;
  isVerified: boolean = false;
  errorMessage: string = ''; // Holds the error message

  constructor(private router: Router, private claimService: ClaimService) {}

  handleScan(): void {
    this.scanning = true;
    this.errorMessage = ''; // Clear any previous error messages

    // Simulate API call for face recognition
    setTimeout(() => {
      this.scanning = false;
      this.showModal = true;
      this.isVerified = Math.random() > 0.5; // Randomly simulate success/failure
    }, 3000);
  }

  closeModal(): void {
    if (this.isVerified) {
      this.claimService.authenticateUser();
      this.router.navigate(['/claim']);
    } else {
      // Authentication failed, show error message
      this.errorMessage = 'Authentication failed. Please try again.';
      this.showModal = false; // Close the modal
    }
  }
}
