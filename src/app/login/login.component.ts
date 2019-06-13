import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() onLogedIn = new EventEmitter();

  returnedUser;
 
  constructor(
    private router: Router,
    private auth: AuthService ) { }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }


  login(user) {
    let ruser = this.auth.login(user);
    // this.returnedUser = this.auth.login(user);
    //.subscribe(users => {
    //   for(let userIndex in users) {
    //     if(user.email === users[userIndex]['email'] && 
    //       user.password === users[userIndex]['password']){
    //       Object.assign(this.returnedUser, users[userIndex]);

    //       this.onLogedIn.emit(users[userIndex]['name']);
    //       alert('Log In sucessfully!');
    //       this.router.navigate(['/menu']);
    //       // this.returnedUser['email'] = email;
    //     }
    //   }
    //   console.log('result ', this.returnedUser);
    // });
    
    if (ruser !== null) {
      alert("Logedin susseccfully.");
      
      // console.log('returned ', ruser.key);
      // localStorage.setItem('logedinId', ruser.key)
      
      this.router.navigate(['/menu']);

      console.log("Logdin successfully");

      
      // this.returnedUser = null;
    }
    console.log('got ', ruser);
    
  }

}
