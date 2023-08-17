import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gallery } from './gallery.model';
import { GalleryService } from './gallery.service';
import { ModalController } from '@ionic/angular';
import { AddPictureModalComponent } from './add-picture-modal/add-picture-modal.component';
import { OverlayEventDetail } from '@ionic/core'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit, OnDestroy {

  gallery: Gallery[] = [];

  private gallerySub!: Subscription;

  constructor(private router: Router, private galleryService: GalleryService, private modalCtrl: ModalController) { 
    console.log('constructor')
   }

   openPictureDetails(pictureId: string) {
    this.router.navigate(['/gallery', pictureId]);
  }

  ngOnInit() {
    //subscribujemo se na neku gallery metodu i definisemo next metodu da radi da menja lokalnu gallery promenljivu 
   this.gallerySub = this.galleryService.gallery.subscribe((gallery)=> {
      this.gallery = gallery;
    });  
  }

  ionViewWillEnter(){ 
    this.galleryService.getPicture().subscribe((gallery)=> {
    });
  }

  openModal(){
    this.modalCtrl.create({
      component: AddPictureModalComponent, //dobijamo promise iz create-a
      componentProps: {title: 'Add picture'}
    }).then((modal:HTMLIonModalElement) =>{ //kad dobijemo modal, prikazujemo ga preko present metode
      modal.present(); 
      return modal.onDidDismiss(); //vraca promise
    }).then((resultData: OverlayEventDetail<any>) => { 
      if(resultData.role === 'confirm') { 
        console.log(resultData);  //u slucaju kada se klikne na dugme add picture, i ukoliko je forma validna
        this.galleryService.addPicture(resultData.data.pictureData.description, resultData.data.pictureData.imageUrl).subscribe((gallery) => {
        } );
      }
    });
  }

  deletePicture(pictureId: string) {
    this.galleryService.deletePicture(pictureId).subscribe(() => {
      // Optionally, you can update the local gallery array after deletion.
      // Since you are subscribed to the gallery observable, it will be updated automatically.
      // For example:
      // this.gallery = this.gallery.filter((picture) => picture.id !== pictureId);
    });
  }

  openUpdateModal(pictureId: string) {
    this.modalCtrl.create({
      component: AddPictureModalComponent,
      componentProps: {
        title: 'Update Picture Description',
        pictureId: pictureId,
      },
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData: OverlayEventDetail<any>) => {
      if (resultData.role === 'confirm') {
        console.log(resultData);
        const updatedDescription = resultData.data.pictureData.description;
        this.galleryService.updatePictureDescription(pictureId, updatedDescription).subscribe(() => {
        });
      }
    });
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
    if(this.gallerySub) { 
      this.gallerySub.unsubscribe();
    }
  }


}
