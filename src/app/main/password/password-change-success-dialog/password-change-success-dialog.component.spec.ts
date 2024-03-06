import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeSuccessDialogComponent } from './password-change-success-dialog.component';

describe('PasswordChangeSuccessDialogComponent', () => {
  let component: PasswordChangeSuccessDialogComponent;
  let fixture: ComponentFixture<PasswordChangeSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordChangeSuccessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordChangeSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
