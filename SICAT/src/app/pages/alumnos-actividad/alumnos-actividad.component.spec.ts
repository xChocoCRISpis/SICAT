import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosActividadComponent } from './alumnos-actividad.component';

describe('AlumnosActividadComponent', () => {
  let component: AlumnosActividadComponent;
  let fixture: ComponentFixture<AlumnosActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
