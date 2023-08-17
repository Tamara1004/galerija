import { Component, Input, OnInit } from '@angular/core';
import { Gallery } from '../gallery.model';
import { AlertController, ModalController } from '@ionic/angular';
import { LikedPictureService } from 'src/app/liked/liked-picture.service';
import { AddPictureModalComponent } from '../add-picture-modal/add-picture-modal.component';
import { GalleryService } from '../gallery.service';

@Component({
  selector:           'app-picture-element',
  templateUrl:        './picture-element.component.html',
  styleUrls:          ['./picture-element.component.scss'],
})
export class PictureElementComponent  implements OnInit {
  @Input()gallery!: Gallery;
  
    constructor(
      private alertCtrl: AlertController,
      private likedPictureService: LikedPictureService,
      private modalCtrl: ModalController,
      private galleryService: GalleryService // Add GalleryService dependency

    ) { }

  ngOnInit() {}

  openAlert(event: { stopPropagation: () => void; preventDefault: () => void; }) {
    event.stopPropagation();
    event.preventDefault();
    this.alertCtrl.create({
      header: "Saving picture",
      message: "Are you sure you want to save this picture?",
      buttons: [
        {
          text: 'Save',
          handler: () => {
            console.log("Save it!");
            this.likedPictureService.addLikedPicture(this.gallery); // Add the liked picture to the service
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Do not save it!");
          }
        }
      ]
    }).then((alert: HTMLIonAlertElement) => { //kad dobijamo kreirani alert, prikazujemo ga pomocu present metode
      alert.present();
    });
  }

  async openUpdateModal(pictureId: string) {
    const modal = await this.modalCtrl.create({
      component: AddPictureModalComponent,
      componentProps: {
        title: 'Update Picture Description',
        pictureData: { 
          description: this.gallery.description,
          imageUrl: this.gallery.imageUrl } // Pass the current description to the modal
      },
    });
    await modal.present();
    const resultData = await modal.onDidDismiss();
    if (resultData.role === 'confirm') {
      const updatedDescription = resultData.data.pictureData.description;
      this.galleryService.updatePictureDescription(pictureId, updatedDescription).subscribe(() => {
        // Update the liked picture description if it exists in the liked pictures
        this.likedPictureService.updateLikedPicture(pictureId, updatedDescription);
      });
    }
  }


  deletePicture(pictureId: string) {
    this.galleryService.deletePicture(pictureId).subscribe(() => {
      // The picture has been deleted from the gallery, and also removed from the liked pictures if it exists there
    });
  }
  
  isPictureLiked(): boolean {
    const likedPictures = this.likedPictureService.getLikedPictures();
    return likedPictures.some((likedPicture) => likedPicture.id === this.gallery.id);
  }

  toggleLike(): void {
    if (this.isPictureLiked()) {
      this.unlikePicture();
    } else {
      this.likePicture();
    }
  }

  likePicture(): void {
    this.likedPictureService.addLikedPicture(this.gallery);
  }

  unlikePicture(): void {
    this.likedPictureService.deleteLikedPicture(this.gallery.id);
  }

}

