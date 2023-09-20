import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuteComponent } from './statute.component';

describe('StatuteComponent', () => {
  let component: StatuteComponent;
  let fixture: ComponentFixture<StatuteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatuteComponent]
    });
    fixture = TestBed.createComponent(StatuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
