import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormClientesComponent } from './form-clientes.component';

describe('FormClientesComponent', () => {
  let component: FormClientesComponent;
  let fixture: ComponentFixture<FormClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
