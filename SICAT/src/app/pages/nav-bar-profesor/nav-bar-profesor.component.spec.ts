import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarProfesorComponent } from './nav-bar-profesor.component';

describe('NavBarProfesorComponent', () => {
  let component: NavBarProfesorComponent;
  let fixture: ComponentFixture<NavBarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
