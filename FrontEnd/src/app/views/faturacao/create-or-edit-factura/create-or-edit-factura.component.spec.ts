import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditFacturaComponent } from './create-or-edit-factura.component';

describe('CreateOrEditFacturaComponent', () => {
  let component: CreateOrEditFacturaComponent;
  let fixture: ComponentFixture<CreateOrEditFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrEditFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
