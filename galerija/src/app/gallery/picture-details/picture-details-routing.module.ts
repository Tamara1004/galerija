import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureDetailsPage } from './picture-details.page';

const routes: Routes = [
  {
    path: '',
    component: PictureDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictureDetailsPageRoutingModule {}
