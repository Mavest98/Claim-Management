import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent {
  constructor(private router: Router) {}
  faqs = [
    {
      title: 'How to file a claim?',
      description: 'Step-by-step guide to filing an insurance claim.',
      link: 'https://example.com/how-to-file-a-claim',
    },
    {
      title: 'Required documents for claims',
      description: 'List of necessary documents for processing claims.',
      link: 'https://example.com/required-documents',
    },
    {
      title: 'Common claim issues',
      description: 'Solutions for common problems with claims.',
      link: 'https://example.com/common-issues',
    },
    {
      title: 'Contact support',
      description: 'Reach out to our support team for claim-related help.',
      link: 'https://example.com/contact-support',
    },
  ];

  onViewClaims(): void {
    this.router.navigate(['/view-claims']);
  }
  onLogClaims(): void {
    this.router.navigate(['/log-claim']);
  }
}
