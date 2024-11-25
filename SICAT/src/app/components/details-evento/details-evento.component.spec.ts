import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEventoComponent } from './details-evento.component';

describe('DetailsEventoComponent', () => {
  let component: DetailsEventoComponent;
  let fixture: ComponentFixture<DetailsEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
