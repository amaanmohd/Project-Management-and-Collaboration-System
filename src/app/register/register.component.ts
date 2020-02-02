import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../services/validate.service';
import {MatSnackBar} from '@angular/material';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { MongoStitch } from '../services/stitch.service';
import { Stitch, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-core';
import { DataService } from '../services/data.service';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email1: string;
  username: String;
  password: string;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private validateService: ValidateService ,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router,
    private stitch: MongoStitch,
    private data: DataService
    ) { }

  ngOnInit() {
    this.data.currentEmail.subscribe(email => this.email1 = email)
  }
   onRegisterSubmit() {
     const user = {
       username :this.username,
       email : this.email1,
       password : this.password,
     };

     if(!this.validateService.validateRegister(user)) {

        this.snackBar.open( 'Please fill all required field', '', {
          duration: 3000,
          verticalPosition: 'top'
        });
        return false;
     }


     if(!this.validateService.validateEmail(user.email)){
      this.snackBar.open( 'Please use a valid email', '', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return false;
    }

    this.data.changeEmail(this.email1);

      const emailPassClient = Stitch.defaultAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPassClient.registerWithEmail(this.email1, this.password)
      .then(() => {
        this.snackBar.open( 'Please confirm your Email', '', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/resend'])
      })
      .catch(err => {
        this.snackBar.open( err.message, '', {
           duration: 3000,
          verticalPosition: 'top'
        });
      });
    }
   }

