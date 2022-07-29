import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditTipoDocumentosComponent } from './create-or-edit-tipo-documentos.component';

describe('CreateOrEditTipoDocumentosComponent', () => {
  let component: CreateOrEditTipoDocumentosComponent;
  let fixture: ComponentFixture<CreateOrEditTipoDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditTipoDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditTipoDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
