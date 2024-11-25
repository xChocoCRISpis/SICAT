import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAlumnosSexoComponent } from './stat-alumnos-sexo.component';

describe('StatAlumnosSexoComponent', () => {
  let component: StatAlumnosSexoComponent;
  let fixture: ComponentFixture<StatAlumnosSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatAlumnosSexoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatAlumnosSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
