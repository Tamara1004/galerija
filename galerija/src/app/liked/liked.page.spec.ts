import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LikedPage } from './liked.page';

describe('LikedPage', () => {
  let component: LikedPage;
  let fixture: ComponentFixture<LikedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LikedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
