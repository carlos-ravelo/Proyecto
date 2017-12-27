import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMovimientoComponent } from './form-movimiento.component';

describe('FormMovimientoComponent', () => {
  let component: FormMovimientoComponent;
  let fixture: ComponentFixture<FormMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
