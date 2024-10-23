import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogClaimComponent } from './log-claim.component';

describe('LogClaimComponent', () => {
  let component: LogClaimComponent;
  let fixture: ComponentFixture<LogClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogClaimComponent]
    });
    fixture = TestBed.createComponent(LogClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
