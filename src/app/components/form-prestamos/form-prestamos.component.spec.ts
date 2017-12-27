import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrestamosComponent } from './form-prestamos.component';

describe('FormPrestamosComponent', () => {
  let component: FormPrestamosComponent;
  let fixture: ComponentFixture<FormPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
