import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewRecipeComponent } from './modal-new-recipe.component';

describe('ModalNewRecipeComponent', () => {
  let component: ModalNewRecipeComponent;
  let fixture: ComponentFixture<ModalNewRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
