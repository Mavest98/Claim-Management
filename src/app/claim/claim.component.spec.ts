import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ClaimComponent } from './claim.component';
import { ClaimsService } from '../claims.service';

describe('ClaimComponent', () => {
  let component: ClaimComponent;
  let fixture: ComponentFixture<ClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [ClaimComponent],
      providers: [ClaimsService]
    });
    fixture = TestBed.createComponent(ClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the Log Claim page', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);

    component.onLogClaims();

    expect(navigateSpy).toHaveBeenCalledWith(['/log-claim']);
  });
});
