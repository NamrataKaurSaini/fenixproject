import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryInstituteComponent } from './gallery-institute.component';

describe('GalleryInstituteComponent', () => {
  let component: GalleryInstituteComponent;
  let fixture: ComponentFixture<GalleryInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
