import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LikedPage } from './liked.page';

describe('LikedPage', () => {
  let component: LikedPage;
  let fixture: ComponentFixture<LikedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LikedPage); //kreira se instanca komponente LikedPage
    component = fixture.componentInstance; //dodeljujemo instancu varijabli component
    fixture.detectChanges(); //metoda se poziva da detektuje promene u komponenti
  }));

  it('should create', () => { //provera da li je instanca setovana
    expect(component).toBeTruthy();
  });


  //Kreira instancu komponente LikedPage i proverava da li je instanca uspesno kreirana 
});
