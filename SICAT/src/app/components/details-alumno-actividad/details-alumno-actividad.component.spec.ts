import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAlumnoActividadComponent } from './details-alumno-actividad.component';

describe('DetailsAlumnoActividadComponent', () => {
  let component: DetailsAlumnoActividadComponent;
  let fixture: ComponentFixture<DetailsAlumnoActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAlumnoActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAlumnoActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
