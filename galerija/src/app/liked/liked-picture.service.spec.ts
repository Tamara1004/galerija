import { TestBed } from '@angular/core/testing';

import { LikedPictureService } from './liked-picture.service';

describe('LikedPictureService', () => {
  let service: LikedPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
