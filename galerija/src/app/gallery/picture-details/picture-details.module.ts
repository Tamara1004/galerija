import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PictureDetailsPageRoutingModule } from './picture-details-routing.module';

import { PictureDetailsPage } from './picture-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PictureDetailsPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: PictureDetailsPage
      }
    ])
  ],
  declarations: [PictureDetailsPage]
})
export class PictureDetailsPageModule {}
