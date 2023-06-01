import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVisaComponent } from './gallery-visa.component';

describe('GalleryVisaComponent', () => {
  let component: GalleryVisaComponent;
  let fixture: ComponentFixture<GalleryVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
