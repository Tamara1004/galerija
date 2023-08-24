import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string ='';
  password: string ='';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() { 
    
  }

  onLogIn(form:NgForm) {
    if(form.invalid){ //ako forma nije validna nece moci da se uloguje
      return;
    }
   this.authService.logIn(); //true
   this.router.navigateByUrl('/gallery');
  }

}
