import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GalleryService } from '../gallery.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-picture-modal',
  templateUrl: './add-picture-modal.component.html',
  styleUrls: ['./add-picture-modal.component.scss'],
})
export class AddPictureModalComponent  implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm; //preko ovog dekoratora, metodi onAddPicture mozemo da pristupimo preko polja forme

  @Input() title!: string;


  constructor( private modalCtrl: ModalController, private galleryService: GalleryService) { }

  ngOnInit() {}

  onAddPicture() {
    if(!this.form.valid) { 
      return; 
    }
    this.modalCtrl.dismiss(
    {
      pictureData: {
        description: this.form.value['description'], 
        imageUrl: this.form.value['imageUrl']
      }      
    },
    'confirm'
   );
  }


  onCancel() { 
    this.modalCtrl.dismiss(); //zatvara najblizi modal otvoren
  }
}
