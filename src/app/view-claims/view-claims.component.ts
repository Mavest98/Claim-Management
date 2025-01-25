import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {
  claims: { title: string; description: string; isEditing?: boolean }[] = [];

  constructor(private claimsService: ClaimsService) {}

  ngOnInit() {
    this.claims = this.claimsService.getClaims();
  }

  editClaim(index: number): void {
    // Set the selected claim to editing mode
    this.claims[index].isEditing = true;
  }

  saveClaim(index: number, updatedTitle: string, updatedDescription: string): void {
    // Save the updated claim and exit editing mode
    this.claims[index].title = updatedTitle;
    this.claims[index].description = updatedDescription;
    this.claims[index].isEditing = false;
    this.claimsService.updateClaim(index, {
      title: updatedTitle,
      description: updatedDescription
    });
  }

  cancelEdit(index: number): void {
    // Exit editing mode without saving
    this.claims[index].isEditing = false;
  }
}
