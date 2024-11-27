import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNavBarComponent } from './content-nav-bar.component';

describe('ContentNavBarComponent', () => {
  let component: ContentNavBarComponent;
  let fixture: ComponentFixture<ContentNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
