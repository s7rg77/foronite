import { Injectable } from '@angular/core';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class SignService {

  private uid: string = '';

  constructor(
    private auth: Auth
  ) {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        this.uid = user.uid;
      } else {
        this.uid = '';
      }

    });
  }

  getuid() {

    return this.uid;

  }

  signed(): boolean {

    return this.uid !== '';

  }

  async signup({ user_mail, user_pass }: any) {

    const userData = await createUserWithEmailAndPassword(this.auth, user_mail, user_pass);
    return userData;

  }

  async signin({ user_mail, user_pass }: any) {

    const userData = await signInWithEmailAndPassword(this.auth, user_mail, user_pass);
    return userData;

  }

  signout() {

    return signOut(this.auth);

  }

}