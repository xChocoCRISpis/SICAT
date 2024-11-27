import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNavBarComponent } from './up-nav-bar.component';

describe('UpNavBarComponent', () => {
  let component: UpNavBarComponent;
  let fixture: ComponentFixture<UpNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
