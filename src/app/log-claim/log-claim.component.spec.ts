import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogClaimComponent } from './log-claim.component';

declare const describe: (description: string, specDefinitions: () => void) => void;
declare const beforeEach: (action: () => void) => void;
declare const it: (description: string, testFunction: () => void) => void;
declare const expect: (actual: unknown) => { toBeTruthy: () => void };

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
