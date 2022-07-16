import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditMunicipiosComponent } from './create-or-edit-municipios.component';

describe('CreateOrEditMunicipiosComponent', () => {
  let component: CreateOrEditMunicipiosComponent;
  let fixture: ComponentFixture<CreateOrEditMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditMunicipiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
