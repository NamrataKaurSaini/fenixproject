import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryResultsComponent } from './gallery-results.component';

describe('GalleryResultsComponent', () => {
  let component: GalleryResultsComponent;
  let fixture: ComponentFixture<GalleryResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
