import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAlumnosTipoYActividadComponent } from './stat-alumnos-tipo-y-actividad.component';

describe('StatAlumnosTipoYActividadComponent', () => {
  let component: StatAlumnosTipoYActividadComponent;
  let fixture: ComponentFixture<StatAlumnosTipoYActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatAlumnosTipoYActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatAlumnosTipoYActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
