import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalUserLoginComponent } from './modal-user-login.component';

describe('ModalUserLoginComponent', () => {
  let component: ModalUserLoginComponent;
  let fixture: ComponentFixture<ModalUserLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
