import { Component, OnInit } from '@angular/core';
import { Gallery } from '../gallery.model';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../gallery.service';

@Component({
  selector:         'app-picture-details',
  templateUrl:      './picture-details.page.html',
  styleUrls:        ['./picture-details.page.scss'],
})
export class PictureDetailsPage implements OnInit {

  gallery: Gallery = 
    {
      id:             'p1',
      description:    'first pic',
      imageUrl:       "assets/img/pexels-anni-roenkae-2860804.jpg"
    }

    //hocemo da ucitamo iz trenutno aktivne rute id slike i pozovemo metodu getPicture i prosledimo joj taj id

  constructor(private route:ActivatedRoute, private galleryService: GalleryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const picId = paramMap.get('picId');
  
      if (picId) {
        this.galleryService.getGallery(picId).subscribe((gallery: Gallery) => {
          this.gallery = gallery;
        });
      } else {
        console.log("picture unavailable"); 
      }
    });
  }
  

}
