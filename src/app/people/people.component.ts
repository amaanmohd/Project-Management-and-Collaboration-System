import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
export interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  constructor(
    private stitch: MongoStitch,
    private router: Router,
    private snackBar: MatSnackBar,
    private data: DataService
    ) { }
  roles: Role[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  member = [];
  project;
  ngOnInit() {
    this.data.currentProject.subscribe(project => this.project = project)
  }

 add(email, name) {
  this.member.push({email: email, name: name, role: ''});
 }
 remove(email) {
   for (let i = 0; i < this.member.length; i++) {
     if (this.member[i]['email'] === email) {
       this.member.splice(i, 1);
     }
   }
 }

 update(email, r) {
   for (let i = 0; i < this.member.length; i++) {
    if (this.member[i]['email'] === email) {
      this.member[i]['role'] = r;
    }
  }

 }
 addPeople() {
  const query = {user_id: this.stitch.client.auth.user.id , project_name: this.project};
const update = {
  $set: {
    member: this.member
    }

  }
const options = { upsert: true };
const projectCollection = this.stitch.mongodb.db('myApp').collection('members');

projectCollection.updateOne(query, update, options)
  .then(result => {
    const { matchedCount, modifiedCount } = result;
    if(matchedCount && modifiedCount) { console.log(`Successfully updated the item.`) }
    this.snackBar.open( 'Peoples Added' , '', {
      duration: 2000,
      verticalPosition: 'top'  });
    this.router.navigate(['/task']);
  })
  .catch(err => { this.snackBar.open(err.message, '', {
    duration: 3000,
    verticalPosition: 'top' });
    this.router.navigate(['/people']);
   })

 }
}
