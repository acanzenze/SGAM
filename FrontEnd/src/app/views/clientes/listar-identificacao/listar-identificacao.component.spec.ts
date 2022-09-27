import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIdentificacaoComponent } from './listar-identificacao.component';

describe('ListarIdentificacaoComponent', () => {
  let component: ListarIdentificacaoComponent;
  let fixture: ComponentFixture<ListarIdentificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarIdentificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarIdentificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
