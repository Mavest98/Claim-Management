import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogClaimComponent } from './log-claim/log-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';

const routes: Routes = [
  { path: 'log-claim', component: LogClaimComponent },
  { path: 'view-claims', component: ViewClaimsComponent },
  { path: '', redirectTo: '/log-claim', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
