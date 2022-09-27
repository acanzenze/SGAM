import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAfiliacaoComponent } from './listar-afiliacao.component';

describe('ListarAfiliacaoComponent', () => {
  let component: ListarAfiliacaoComponent;
  let fixture: ComponentFixture<ListarAfiliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAfiliacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAfiliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
