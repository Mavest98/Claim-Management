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
    this.claims = this.claimsService.getClaims().map(claim => ({
      ...claim,
      status: 'Pending' // Default status set to Pending
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
}
