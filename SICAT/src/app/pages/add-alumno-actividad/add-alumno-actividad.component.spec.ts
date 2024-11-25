import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoActividadComponent } from './add-alumno-actividad.component';

describe('AddAlumnoActividadComponent', () => {
  let component: AddAlumnoActividadComponent;
  let fixture: ComponentFixture<AddAlumnoActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlumnoActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
