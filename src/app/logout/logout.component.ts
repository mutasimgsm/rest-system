import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.logOutUser();
    console.log('I am a logOut');
      // localStorage.removeItem('logedinId');
      // localStorage.removeItem('direct');

      // this.router.navigate(['/menu']);
  }

}
