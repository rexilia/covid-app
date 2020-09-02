import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _loginState: BehaviorSubject<string> = new BehaviorSubject<string>(
        'AUTH_INITIATED'
    );

    get loginState() {
        return this._loginState.asObservable();
    }
    currentUser: Observable<firebase.User>;

    constructor(private afa: AngularFireAuth) {
        this.currentUser = this.afa.authState;
        this.currentUser.subscribe((val) => {
            if (!!val) {
                this._loginState.next('AUTH_SIGNED_IN');
            } else {
                this._loginState.next('AUTH_SIGNED_OUT');
            }
        });
    }

    login(email: string, password: string) {
        return this.afa.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.afa.signOut();
    }
}