import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatOrEditProvinciasComponent } from './creat-or-edit-tipo-solicitacao.component';

describe('CreatOrEditProvinciasComponent', () => {
  let component: CreatOrEditProvinciasComponent;
  let fixture: ComponentFixture<CreatOrEditProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatOrEditProvinciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatOrEditProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
