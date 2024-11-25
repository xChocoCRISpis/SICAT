import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoToEventoComponent } from './add-alumno-to-evento.component';

describe('AddAlumnoToEventoComponent', () => {
  let component: AddAlumnoToEventoComponent;
  let fixture: ComponentFixture<AddAlumnoToEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlumnoToEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnoToEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
