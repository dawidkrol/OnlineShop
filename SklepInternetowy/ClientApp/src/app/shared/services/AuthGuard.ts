import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})

    export class AuthGuard  {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
      let aa = this.auth.isLoggedIn
      if (!aa) {
          //user isNOT loggedin
          //route the user to login page
        this.router.navigate(['sign-in']);
          //dont show the next route
          //lets fail the guard
          return false;
      } else {
        //user is loggedin; pass the guard i.e. show the next route associated with this guard
        return true;
      }
    }
}
