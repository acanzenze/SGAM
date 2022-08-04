import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDeFacturaComponent } from './listagem-de-factura.component';

describe('ListagemDeFacturaComponent', () => {
  let component: ListagemDeFacturaComponent;
  let fixture: ComponentFixture<ListagemDeFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemDeFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemDeFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
