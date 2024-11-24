import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelHorarioAndActivityComponent } from './del-horario-and-activity.component';

describe('DelHorarioAndActivityComponent', () => {
  let component: DelHorarioAndActivityComponent;
  let fixture: ComponentFixture<DelHorarioAndActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelHorarioAndActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelHorarioAndActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
