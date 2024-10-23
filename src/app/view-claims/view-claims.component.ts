import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html'
})
export class ViewClaimsComponent implements OnInit {
  claims: { title: string, description: string }[] = [];

  constructor(private claimsService: ClaimsService) {}

  ngOnInit() {
    this.claims = this.claimsService.getClaims();
  }

  deleteClaim(index: number) {
    this.claimsService.deleteClaim(index);
  }
}
