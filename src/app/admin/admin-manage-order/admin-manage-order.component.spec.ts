import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageOrderComponent } from './admin-manage-order.component';

describe('AdminManageOrderComponent', () => {
  let component: AdminManageOrderComponent;
  let fixture: ComponentFixture<AdminManageOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
