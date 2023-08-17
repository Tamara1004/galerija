import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { PictureElementComponent } from './picture-element/picture-element.component';
import { AddPictureModalComponent } from './add-picture-modal/add-picture-modal.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule
  ],
  declarations: [GalleryPage, PictureElementComponent, AddPictureModalComponent],
})
export class GalleryPageModule {}
