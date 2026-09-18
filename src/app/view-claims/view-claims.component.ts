import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {
  claims: { title: string; description: string; status: string; isEditing?: boolean; isExpanded?: boolean }[] = [];

  constructor(private claimsService: ClaimsService) {}

  ngOnInit() {
    this.refreshClaims();
  }

  get approvedClaimsCount(): number {
    return this.claims.filter((claim) => claim.status === 'Approved').length;
  }

  get pendingClaimsCount(): number {
    return this.claims.filter((claim) => claim.status === 'Pending').length;
  }

  refreshClaims(): void {
    this.claims = this.claimsService.getClaims().map((claim, index) => ({
      ...claim,
      status: index % 2 === 0 ? 'Pending' : 'Approved'
    }));
  }

  toggleDescription(index: number): void {
    this.claims[index].isExpanded = !this.claims[index].isExpanded;
  }

  editClaim(index: number): void {
    this.claims[index].isEditing = true;
  }

  saveClaim(index: number, updatedTitle: string, updatedDescription: string): void {
    this.claims[index].title = updatedTitle;
    this.claims[index].description = updatedDescription;
    this.claims[index].isEditing = false;
    this.claimsService.updateClaim(index, {
      title: updatedTitle,
      description: updatedDescription
    });
  }

  cancelEdit(index: number): void {
    this.claims[index].isEditing = false;
  }

  deleteClaim(index: number): void {
    this.claimsService.deleteClaim(index);
    this.refreshClaims();
  }
}
