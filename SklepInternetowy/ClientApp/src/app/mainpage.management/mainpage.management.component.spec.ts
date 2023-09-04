import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpageManagementComponent } from './mainpage.management.component';

describe('MainpageManagementComponent', () => {
  let component: MainpageManagementComponent;
  let fixture: ComponentFixture<MainpageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainpageManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainpageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
