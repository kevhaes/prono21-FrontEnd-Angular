import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBetComponent } from './admin-bet.component';

describe('AdminBetComponent', () => {
  let component: AdminBetComponent;
  let fixture: ComponentFixture<AdminBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
