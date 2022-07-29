import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatOrEditDistritosComponent } from './creat-or-edit-bairros.component';

describe('CreatOrEditDistritosComponent', () => {
  let component: CreatOrEditDistritosComponent;
  let fixture: ComponentFixture<CreatOrEditDistritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatOrEditDistritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatOrEditDistritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
