import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturacaoComponent } from './faturacao.component';

describe('FaturacaoComponent', () => {
  let component: FaturacaoComponent;
  let fixture: ComponentFixture<FaturacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaturacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
