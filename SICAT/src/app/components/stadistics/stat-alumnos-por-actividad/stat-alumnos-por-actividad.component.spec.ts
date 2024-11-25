import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAlumnosPorActividadComponent } from './stat-alumnos-por-actividad.component';

describe('StatAlumnosPorActividadComponent', () => {
  let component: StatAlumnosPorActividadComponent;
  let fixture: ComponentFixture<StatAlumnosPorActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatAlumnosPorActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatAlumnosPorActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
