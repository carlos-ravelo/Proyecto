import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizacionComponent } from './amortizacion.component';

describe('AmortizacionComponent', () => {
  let component: AmortizacionComponent;
  let fixture: ComponentFixture<AmortizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmortizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
