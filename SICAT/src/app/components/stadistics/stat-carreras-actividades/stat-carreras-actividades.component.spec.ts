import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCarrerasActividadesComponent } from './stat-carreras-actividades.component';

describe('StatCarrerasActividadesComponent', () => {
  let component: StatCarrerasActividadesComponent;
  let fixture: ComponentFixture<StatCarrerasActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatCarrerasActividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatCarrerasActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
