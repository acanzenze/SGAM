import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarSolicitacaoComponent } from './publicar-solicitacao.component';

describe('PublicarSolicitacaoComponent', () => {
  let component: PublicarSolicitacaoComponent;
  let fixture: ComponentFixture<PublicarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarSolicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
