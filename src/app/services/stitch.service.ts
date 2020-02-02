import { Injectable } from '@angular/core';
import { Stitch, RemoteMongoClient, UserPasswordCredential,
  UserPasswordAuthProviderClient , StitchAppClient } from 'mongodb-stitch-browser-sdk';
@Injectable({
    providedIn: 'root',
})
export class MongoStitch {
    public mongodb: any;
    public client: StitchAppClient;
    public user;
    public stitch_id;

    constructor() {
        this.client = Stitch.initializeDefaultAppClient('myproject-zadpi');
        this.mongodb = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        this.stitch_id = Stitch.getAppClient('myproject-zadpi');
        this.user = this.client.auth.user;
    }

registerUser(email, password){
  const emailPassClient = Stitch.defaultAppClient.auth
  .getProviderClient(UserPasswordAuthProviderClient.factory);

emailPassClient.registerWithEmail(email, password)
  .then(() => {
     console.log('Successfully sent account confirmation email!');
    })
  .catch(err => {
     console.log('Error registering new user:', err);
  });
}

  }

