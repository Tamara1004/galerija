import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureDetailsPage } from './picture-details.page';

describe('PictureDetailsPage', () => {
  let component: PictureDetailsPage;
  let fixture: ComponentFixture<PictureDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PictureDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
