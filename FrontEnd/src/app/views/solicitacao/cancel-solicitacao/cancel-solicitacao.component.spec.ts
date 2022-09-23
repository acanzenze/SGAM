import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSolicitacaoComponent } from './cancel-solicitacao.component';

describe('CancelSolicitacaoComponent', () => {
  let component: CancelSolicitacaoComponent;
  let fixture: ComponentFixture<CancelSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelSolicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
