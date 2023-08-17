import { Component, OnDestroy, OnInit } from '@angular/core';
import { LikedPictureService } from './liked-picture.service';
import { LikedPicture } from './liked-picture';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.page.html',
  styleUrls: ['./liked.page.scss'],
})
export class LikedPage implements OnInit, OnDestroy {
  likedPictures: LikedPicture[] = [];

  constructor(private likedPictureService: LikedPictureService) { }

  ngOnInit() {
    this.likedPictures = this.likedPictureService.getLikedPictures(); // Fetch the liked pictures from the service
  }
  
  onRemovePicture(id: string) {
    this.likedPictures = this.likedPictures.filter(picture => picture.id !== id);
    this.likedPictureService.deleteLikedPicture(id);
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){ 
    console.log('ionViewDidLeave');
  }

  ngOnDestroy(){ 
    console.log('ngOnDestroy');
  }


}
