import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  firstname;
  lastname;
  constructor(private stitch: MongoStitch,private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  saveInfo() {
    const user = {
      user_id: this.stitch.client.auth.user.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.stitch.client.auth.user.profile.email,
      loggedInProviderName: this.stitch.client.auth.user.loggedInProviderName,
      identities: this.stitch.client.auth.user.identities,
    };
    const userCollection = this.stitch.mongodb.db('myApp').collection('users')
    userCollection.insertOne(user).then(() => { this.snackBar.open( 'Saved' , '', {
      duration: 2000,
      verticalPosition: 'top'  });
    this.router.navigate(['/dashboard']); })
.catch(err => { this.snackBar.open(err.message, '', {
 duration: 3000,
 verticalPosition: 'top' });
});
  }

}
