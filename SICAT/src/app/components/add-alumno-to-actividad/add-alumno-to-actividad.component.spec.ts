import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoToActividadComponent } from './add-alumno-to-actividad.component';

describe('AddAlumnoToActividadComponent', () => {
  let component: AddAlumnoToActividadComponent;
  let fixture: ComponentFixture<AddAlumnoToActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlumnoToActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnoToActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
