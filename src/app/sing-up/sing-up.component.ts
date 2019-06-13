import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  saveUser(user) {
    this.authService.singUp(user).then(x => {
      localStorage.setItem('userId:', x.key)
      
      alert("Account has creaed successfully.\n Click on Log In.");
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
