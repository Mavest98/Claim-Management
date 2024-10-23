import { Component } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-log-claim',
  templateUrl: './log-claim.component.html'
})
export class LogClaimComponent {
  claimTitle: string = '';
  claimDescription: string = '';

  constructor(private claimsService: ClaimsService) {}

  logClaim() {
    if (this.claimTitle && this.claimDescription) {
      const newClaim = {
        title: this.claimTitle,
        description: this.claimDescription
      };

      this.claimsService.addClaim(newClaim);
      this.claimTitle = ''; // Reset form
      this.claimDescription = '';
    }
  }
}
