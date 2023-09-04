import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactinfoManagementComponent } from './contactinfo.management.component';

describe('ContactinfoManagementComponent', () => {
  let component: ContactinfoManagementComponent;
  let fixture: ComponentFixture<ContactinfoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactinfoManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactinfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
