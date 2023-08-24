import { Injectable } from '@angular/core';
import { Gallery } from '../gallery/gallery.model';
import { GalleryService } from '../gallery/gallery.service';

@Injectable({
  providedIn: 'root'
})
export class LikedPictureService {
  private likedPicturesKey = 'likedPictures';
  private likedPictures: Gallery[] = [];

  constructor() {
    const storedLikedPictures = localStorage.getItem(this.likedPicturesKey);
    if (storedLikedPictures) {
      this.likedPictures = JSON.parse(storedLikedPictures);
    }
  }

  getLikedPictures(): Gallery[] {
    return this.likedPictures;
  }


  addLikedPicture(picture: Gallery) {
    const alreadyLiked = this.likedPictures.some((likedPicture) => likedPicture.id === picture.id);

    if (!alreadyLiked) { //ako nije lajkovana, onda je prikazi na liked stranici - sprecava pojavu duplikata ukoliko dva puta lajkujemo istu sliku 
      this.likedPictures.push({ ...picture });
      this.updateLocalStorage();
    }
  }

  deleteLikedPicture(pictureId: string) { //brise sliku sa datim pictureId iz liste omiljenih slika i azurira skladiste nakon toga
    this.likedPictures = this.likedPictures.filter(picture => picture.id !== pictureId);
    this.updateLocalStorage();
  }

  updateLikedPicture(pictureId: string, newDescription: string) { //azurira opis omiljene slike sa datim pictureId
    const likedPicture = this.findLikedPictureById(pictureId);
    if (likedPicture) {
      likedPicture.description = newDescription;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem(this.likedPicturesKey, JSON.stringify(this.likedPictures));
  }

  
  private findLikedPictureById(pictureId: string): Gallery | undefined { 
    return Array.from(this.likedPictures).find((picture) => picture.id === pictureId);
  }

 
}
