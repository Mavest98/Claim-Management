import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogClaimComponent } from './log-claim/log-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { LoginComponent } from './login/login.component';
import { ClaimComponent } from './claim/claim.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'log-claim', component: LogClaimComponent },
  { path: 'view-claims', component: ViewClaimsComponent },
  { path: 'claim', component: ClaimComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
