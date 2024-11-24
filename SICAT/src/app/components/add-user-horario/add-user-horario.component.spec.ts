import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserHorarioComponent } from './add-user-horario.component';

describe('AddUserHorarioComponent', () => {
  let component: AddUserHorarioComponent;
  let fixture: ComponentFixture<AddUserHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
