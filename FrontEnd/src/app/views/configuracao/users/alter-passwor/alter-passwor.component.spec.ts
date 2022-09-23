import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterPassworComponent } from './alter-passwor.component';

describe('AlterPassworComponent', () => {
  let component: AlterPassworComponent;
  let fixture: ComponentFixture<AlterPassworComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterPassworComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterPassworComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
