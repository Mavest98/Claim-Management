import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from '../claims.service';

interface DashboardClaim {
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
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent {
  constructor(private router: Router, private claimsService: ClaimsService) {
    this.loadClaims();
  }

  currentView: 'overview' | 'verify' | 'form' | 'claims' = 'overview';
  isScanning = false;
  selectedFaq: string | null = null;
  verifiedUser = {
    fullName: 'Alex Mercer',
    idNumber: 'ID-9082-331X'
  };
  claimInput = {
    policyNumber: '',
    incidentType: 'Vehicle',
    claimAmount: null as number | null,
    resolution: 'Reimbursement',
    claimDescription: ''
  };
  submittedClaims: DashboardClaim[] = [];

  faqs = [
    {
      title: 'How to file a claim?',
      description: 'Step-by-step guide to filing an insurance claim.',
      link: 'https://example.com/how-to-file-a-claim',
      details: [
        "1. How do I file a claim? - Navigate to 'Log a Claim' in the app, authenticate, and fill in all required details.",
        "2. What information do I need to provide? - Policy number, incident details (date, time, location), and relevant photos/documents.",
        "3. Can I file a claim for someone else? - No, only the policyholder can file a claim as authentication is required."
      ]
    },
    {
      title: 'Required documents for claims',
      description: 'List of necessary documents for processing claims.',
      link: 'https://example.com/required-documents',
      details: [
        "1. What documents are required? - Insurance policy, proof of identity, incident report (e.g., police report), and evidence (photos/videos).",
        "2. How do I upload the required documents? - Navigate to 'View Claims', select your claim, and click 'Upload Documents'.",
        "3. What if I don’t have all documents? - You can submit missing documents later, but the claim won't be processed until they are received."
      ]
    },
    {
      title: 'Common claim issues',
      description: 'Solutions for common problems with claims.',
      link: 'https://example.com/common-issues',
      details: [
        "1. Why was my claim denied? - Insufficient documentation, policy exclusions, expired coverage, or unrecognized biometric data.",
        "2. How to avoid claim issues? - Provide all required documents, file within coverage period, and describe the incident accurately.",
        "3. How to appeal a decision? - Contact support and provide additional documentation to request a review."
      ]
    },
    {
      title: 'Contact support',
      description: 'Reach out to our support team for claim-related help.',
      link: 'https://example.com/contact-support',
      details: [
        "1. How do I contact support? - Use the in-app support feature or call the helpline on our website.",
        "2. What info should I provide? - Policy number, claim reference, and a brief description of your issue.",
        "3. Can I chat with an agent? - Yes, live chat is available 24/7 for urgent claim-related assistance."
      ]
    }
  ];

  onViewClaims(): void {
    this.router.navigate(['/view-claims']);
  }

  onLogClaims(): void {
    this.router.navigate(['/log-claim']);
  }

  verifyIdentity(): void {
    this.isScanning = true;
    setTimeout(() => {
      this.isScanning = false;
      this.currentView = 'form';
    }, 1200);
  }

  submitClaim(): void {
    if (!this.claimInput.policyNumber || !this.claimInput.claimAmount || !this.claimInput.claimDescription) {
      return;
    }

    const claim: DashboardClaim = {
      id: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
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
      title: `${claim.incidentType} claim - ${claim.policyNumber}`,
      description: `${claim.claimDescription} Claim amount: $${claim.claimAmount}. Preferred resolution: ${claim.resolution}.`
    });
    this.submittedClaims.unshift(claim);
    this.currentView = 'claims';
  }

  private loadClaims(): void {
    this.submittedClaims = this.claimsService.getClaims().map((claim, index) => ({
      id: `CLM-${String(index + 1).padStart(6, '0')}`,
      policyNumber: claim.title,
      incidentType: 'Claim',
      claimAmount: 0,
      resolution: 'Review required',
      claimDescription: claim.description,
      dateSubmitted: 'Previously submitted',
      status: index % 2 === 0 ? 'Under Review' : 'Approved',
      verifiedUser: this.verifiedUser.fullName
    }));
  }

  toggleFaq(index: number): void {
    this.selectedFaq = this.selectedFaq === this.faqs[index].title ? null : this.faqs[index].title;
  }
}
