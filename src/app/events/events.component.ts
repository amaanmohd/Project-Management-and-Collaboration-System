import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
event_name;
date;
time;

  constructor(private stitch: MongoStitch,
    private router: Router,
    private snackBar:MatSnackBar) { }
  ngOnInit() {
  }
 save(){
  const query = {user_id: this.stitch.client.auth.user.id }
  const update = {
    $push: {
      events: {
        event_name: this.event_name,
        time: this.time,
        date: this.date
       }
    }
  }
  const option = {upsert: true};
  const taskcollection = this.stitch.mongodb.db('myApp').collection('events');
  taskcollection.updateOne(query, update, option)
  .then(result => {
    const { matchedCount, modifiedCount } = result;
      if(matchedCount && modifiedCount) {console.log(`Successfully updated the item.`) }
      this.snackBar.open( 'Event Created' , '', {
        duration: 2000,
        verticalPosition: 'top'  });
        this.router.navigate(['/people']);
  })
  .catch(err => { this.snackBar.open(err.message, '', {
    duration: 3000,
    verticalPosition: 'top' });
    console.log(err);
    this.router.navigate(['/project']);
   });

 }
}
