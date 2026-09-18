import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { ClaimComponent } from './claim/claim.component';
import { LogClaimComponent } from './log-claim/log-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'claim', pathMatch: 'full' },
  { path: 'claim', component: ClaimComponent, canActivate: [AuthGuard] },
  { path: 'log-claim', component: LogClaimComponent, canActivate: [AuthGuard] },
  { path: 'view-claims', component: ViewClaimsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'claim' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }