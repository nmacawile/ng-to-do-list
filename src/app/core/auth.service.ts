import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from './core.module';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
    );

    this.user$.subscribe(user => (this.user = user));
  }

  googleLogIn() {
    this.oAuthLogIn(new auth.GoogleAuthProvider()).then(() =>
      this.router.navigate(['/projects']),
    );
  }

  private oAuthLogIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.createOrUpdateUser(credential.user);
    });
  }

  private createOrUpdateUser(userData) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userData.uid}`,
    );

    const user: User = {
      uid: userData.uid,
      email: userData.email,
    };

    return userRef.set(user, { merge: true });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
  }
}
