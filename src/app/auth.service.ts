import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap, take } from 'rxjs/operators';
// import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  userAll$: Observable<firebase.User>;
  returnedUser = [];

  constructor(
    private router: Router,
    private userService: UserService,
    public afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

   loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  singUp(user) {
    return this.userService.createUser(user);
  }

  login(user) {
 
     this.userService.login().subscribe(users => {
      
      for(let userIndex in users) {
        if(user.email === users[userIndex]['email'] && 
          user.password === users[userIndex]['password']){
          // this.returnedUser = this.returnedUser: [] || null;  // check for null

          Object.assign(this.returnedUser, users[userIndex]);

          localStorage.setItem('logedinName', users[userIndex]['email']);
          localStorage.setItem('logedinId', users[userIndex]['key']);
          localStorage.setItem('logedInType', 'direct')
          // this.onLogedIn.emit(users[userIndex]['name']);
          // alert('Log In sucessfully!');
          // this.router.navigate(['/menu']);
          // this.returnedUser['email'] = email;
        } else {
          this.returnedUser = null;
        }
        
      }
    });
    // this.userAll$.subscribe(u => {
    //   u.displayName = this.returnedUser['name'];
    //   u.email = this.returnedUser['email'];
    //   u.updatePassword = this.returnedUser['password'];
    // })
    return this.returnedUser;
  }

  getLogedinUser() {
    let storedUid = localStorage.getItem('logedinId');
    console.log('logedinId', storedUid);

    // this.userService.get(storedUid).valueChanges().pipe(take(1)).subscribe((user: any) => {
    //   this.returnedUser = user;
    // });
    
    return this.userService.get(storedUid);

    // return this.returnedUser;
  }
 
  logout() {
    this.afAuth.auth.signOut();
  }

  logOutUser() {
    localStorage.removeItem('logedinName');
    localStorage.removeItem('logedinId');

    // this.login(null);
    this.router.navigate(['/menu']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      }));
  }
}
