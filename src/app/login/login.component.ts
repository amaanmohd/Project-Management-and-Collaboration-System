import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MongoStitch } from '../services/stitch.service';
import { UserPasswordCredential } from 'mongodb-stitch-browser-sdk';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);


   email1: string;
    password: string;
    message = null;
    hide = true;
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
    }
    constructor(private authService: AuthService,
    private router: Router,
   private snackBar: MatSnackBar,
   private stitch: MongoStitch
   ) { }

  ngOnInit() {
  }

  // onLoginSubmit() {
  //   const user = {
  //     email: this.email,
  //     password: this.password,

  //   }
  //   this.authService.authenticateUser(user).subscribe(data => {
  //     if(data.success) {
  //       this.authService.storeUserData(data.token, data.user);
  //       this.snackBar.open( 'logged In' , '', {
  //         duration: 3000,
  //         verticalPosition: 'top'
  //       });
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       this.snackBar.open( data.msg , '', {
  //         duration: 3000,
  //         verticalPosition: 'top'
  //       });
  //       this.router.navigate(['/login']);
  //     }
  //   })
  // }

  stitchlogin () {
   const credential = new UserPasswordCredential(this.email1, this.password);
    this.stitch.client.auth.loginWithCredential(credential)
   .then(() => { this.snackBar.open( 'logged In' , '', {
            duration: 2000,
            verticalPosition: 'top'  });
          this.router.navigate(['/dashboard']); })
   .catch(err => { this.snackBar.open(err.message, '', {
       duration: 3000,
       verticalPosition: 'top' });
    });
 }
}
