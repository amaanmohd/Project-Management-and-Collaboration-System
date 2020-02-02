import { Component, OnInit } from '@angular/core';
import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk';


@Component({
  selector: 'app-mongo',
  templateUrl: './mongo.component.html',
  styleUrls: ['./mongo.component.css']
})
export class MongoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Stitch.initializeDefaultAppClient('myproject-zadpi');
    const stitchClient = Stitch.defaultAppClient;
    const client = Stitch.defaultAppClient;

    console.log('logging in anonymously');
    client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      console.log(`logged in anonymously as user ${user.id}`);
    });


  }

}
