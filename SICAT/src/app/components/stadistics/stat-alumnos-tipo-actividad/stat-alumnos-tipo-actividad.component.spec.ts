import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAlumnosTipoActividadComponent } from './stat-alumnos-tipo-actividad.component';

describe('StatAlumnosTipoActividadComponent', () => {
  let component: StatAlumnosTipoActividadComponent;
  let fixture: ComponentFixture<StatAlumnosTipoActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatAlumnosTipoActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatAlumnosTipoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
