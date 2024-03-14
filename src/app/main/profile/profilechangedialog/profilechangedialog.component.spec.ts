import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilechangedialogComponent } from './profilechangedialog.component';

describe('ProfilechangedialogComponent', () => {
  let component: ProfilechangedialogComponent;
  let fixture: ComponentFixture<ProfilechangedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilechangedialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilechangedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
