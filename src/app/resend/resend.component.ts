import { Component, OnInit } from '@angular/core';
import { Stitch, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MongoStitch } from '../services/stitch.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {
   email: string;
  constructor(
    private data: DataService,
    private router: Router,
    private stitch: MongoStitch,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.data.currentEmail.subscribe(email => this.email = email)
  }
  resend() {
  const emailPassClient = this.stitch.client.auth
  .getProviderClient(UserPasswordAuthProviderClient.factory);

emailPassClient.resendConfirmationEmail(this.email)
  .then(() => {
    this.snackBar.open( 'Email Sent', '', {
      duration: 3000,
      verticalPosition: 'top'
    });  })
  .catch(err => {
    this.snackBar.open( err.message, '', {
      duration: 3000,
      verticalPosition: 'top'
    });  });
}
}

