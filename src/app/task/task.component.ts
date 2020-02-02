import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Stitch } from 'mongodb-stitch-browser-core';

export interface Select {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  member: any[] ;
  members: Select[];
  priorities: Select[] = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}
  ];
  project;
  taskName;
  description;
  date;
  member1;
  priority1;
  toppings = new FormControl();
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  constructor(private stitch: MongoStitch,
    private data: DataService,
    private snackBar: MatSnackBar,
    private router: Router) { }
  ngOnInit() {
    this.data.currentProject.subscribe(project => this.project = project)
    const query = {user_id: this.stitch.client.auth.user.id, project_name: this.project};
    const options = {projection: {member: true }};
    const projectCollection = this.stitch.mongodb.db('myApp').collection('members');
    projectCollection.find(query, options).toArray()
      .then(result => {
        if(result) {
          console.log(result)
          this.member = result;
          console.log(this.member[0]['member'].length);
          this.members = [
            {value: 'everyone', viewValue: 'Everyone'}
          ];
          for (let i = 0; i < this.member[0]['member'].length; i++) {
            this.members.push({value: this.member[0]['member'][i]['email'], viewValue: this.member[0]['member'][i]['name']})
          }

        } else {
          console.log('No document matches the provided query.');
        }
      })
      .catch(err => console.error(`Failed to find document: ${err}`) )
  }
  setTask() {
const query = {user_id: this.stitch.client.auth.user.id , project_name: this.project}
const update = {
  $push: {
    tasks: {
      task_name: this.taskName,
      task_description: this.description,
      assignTo: this.member1,
      priority: this.priority1,
      date: this.date
    }
  }
}
const option = {upsert: true};
const taskcollection = this.stitch.mongodb.db('myApp').collection('tasks');
taskcollection.updateOne(query, update, option)
.then(result => {
  const { matchedCount, modifiedCount } = result;
    if(matchedCount && modifiedCount) { console.log(`Successfully updated the item.`)}
    this.snackBar.open( 'Task Added' , '', {
      duration: 2000,
      verticalPosition: 'top'  });
      console.log(this.toppings.value);
      this.toppings.value.forEach(element => {
        const client = Stitch.defaultAppClient;
client.callFunction("sendEmail", [element]).then(result => {
    console.log(result)
      });

});
      this.router.navigate(['/dashboard']);
})
.catch(err => { this.snackBar.open(err.message, '', {
  duration: 3000,
  verticalPosition: 'top' });
  console.log(err);
  this.router.navigate(['/task']);
 });


  }

  send(){
    const client = Stitch.defaultAppClient;
    client.callFunction("sendEmail", ['amaan.cse@gmail.com']).then(result => {
        console.log(result)
    });
  }
}
