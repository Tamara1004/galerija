import { EventEmitter, Injectable } from '@angular/core';
import { Gallery } from './gallery.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';

interface PictureData{
  description:      string; 
  imageUrl:         string;
}

@Injectable({
  providedIn:         'root'
})
export class GalleryService {

  private _gallery = new BehaviorSubject<Gallery[]>([]); //aktivniji observable

  get gallery(){
    return this._gallery.asObservable();
  }
  pictureDeleted = new EventEmitter<string>();

 
  constructor(private http: HttpClient) {
    this.getPicture().subscribe((gallery) => {
      this._gallery.next(gallery); // Update the shared gallery list with the fetched data
    });
  }


  addPicture(description: string, imageUrl:string) { //kad se klikne na add Picture poziva se post metoda, povratna vrednost je id slike, tu povratnu vrednost presrecemo pomocu map citata i prosirujemo niz u servisu i vracamo kao novu povratnu vrednost prosiren niz citata
    let generatedId: string; 
    return this.http.post<{name: string}>(`https://gallery-app-base-default-rtdb.europe-west1.firebasedatabase.app/picture.json`,
    {
      description,
      imageUrl

    }).pipe(switchMap((resData)=>{ //switchMap vracamo drugi observable - vracamo neki drugi, odnosno poslednji niz slika bez poslednjeg kojeg smo dodali
      generatedId = resData.name;
      return this.gallery; //ovo sadrzi poslednji niz slika 
      }), take(1), tap((gallery) => {
      this._gallery.next(gallery.concat({
        id: generatedId, 
        description,
        imageUrl
      }));
    })); 
  } 

  //pozivanjem addPicture saljemo zahtev ka firebase-u sa podacima 
  //odgovor koji dobijamo je id slike koju firebase kreira
  //kroz pipe presrecemo taj odgovor i radimo dodatno
  //prvo smo iskoristili switchMap menjamo observable na nas poslednje emitovan niz slika
  //kroz take uzimamo samo 1 objekat 
  //sa tap pristupamo  toj vrednosti poslednje emitovanog niza slika i prosirujemo ga za novododatu sliku
  //pozivamo next metodu nad nasim subjectom 


  getPicture() { //get metodu koristimo za dovlacenje nekih resursa, dobijamo objekat 
    return this.http
    .get<{[key:string]: PictureData}>(`https://gallery-app-base-default-rtdb.europe-west1.firebasedatabase.app/picture.json`)
    .pipe(map((imagesData)=>{ //presrecemo vrednost, da dobijemo sredjen niz, sredjujemo kako nama odgovara, saljemo u gallery.page.ts
      const gallery: Gallery[] = [];

      for(const key in imagesData) { 
        if(imagesData.hasOwnProperty(key)) { 
          gallery.push({
            id:             key, 
            description:    imagesData[key].description,
            imageUrl:       imagesData[key].imageUrl
          });
        }
      }
      return gallery;
    }),
    tap(gallery =>{
      this._gallery.next(gallery);
    })
    );
  }



  getGallery(id: string) { 
    return this.http.get<Gallery>(`https://gallery-app-base-default-rtdb.europe-west1.firebasedatabase.app/picture/${id}.json`);
  }

  updatePictureDescription(pictureId: string, newDescription: string): Observable<any> {
    return this.http.patch<any>(
      `https://gallery-app-base-default-rtdb.europe-west1.firebasedatabase.app/picture/${pictureId}.json`,
      { description: newDescription }
    ).pipe(
      tap(() => {
        // Update the 'gallery' BehaviorSubject directly with the updated description
        this._gallery.next(this._gallery.value.map((picture) => {
          if (picture.id === pictureId) {
            return { ...picture, description: newDescription };
          } else {
            return picture;
          }
        }));
      })
    );
  }

  deletePicture(pictureId: string): Observable<any> {
    return this.http.delete<any>(`https://gallery-app-base-default-rtdb.europe-west1.firebasedatabase.app/picture/${pictureId}.json`)
      .pipe(
        tap(() => {
          // Update the 'gallery' BehaviorSubject directly
          this._gallery.next(this._gallery.value.filter((picture) => picture.id !== pictureId));
          
          // Emit an event to notify other components that a picture has been deleted
          this.pictureDeleted.emit(pictureId);
        })
      );
  }
}
