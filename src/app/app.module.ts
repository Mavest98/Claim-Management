import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogClaimComponent } from './log-claim/log-claim.component';
import { ViewClaimsComponent } from './view-claims/view-claims.component';
import { ClaimsService } from './claims.service';
import { LoginComponent } from './login/login.component';
import { ClaimComponent } from './claim/claim.component';

@NgModule({
  declarations: [
    AppComponent,
    LogClaimComponent,
    ViewClaimsComponent,
    LoginComponent,
    ClaimComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ClaimsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
