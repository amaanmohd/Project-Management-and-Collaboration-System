import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  group;
  project;
  description;
  date;
  constructor(private stitch: MongoStitch,
     private router: Router,
      private snackBar: MatSnackBar,
      private data: DataService) { }

  ngOnInit() {
    this.data.currentProject.subscribe(project => this.project = project)
  }
  createProject() {
    this.data.changeProject(this.project);
    const query = {user_id: this.stitch.client.auth.user.id}
    const update = {
      $push: {
        projects: {
          project_name: this.project,
          description: this.description,
          date: this.date
         }
      }
    }
    const option = {upsert: true};
    const taskcollection = this.stitch.mongodb.db('myApp').collection('projects');
    taskcollection.updateOne(query, update, option)
    .then(result => {
      const { matchedCount, modifiedCount } = result;
        if(matchedCount && modifiedCount) {console.log(`Successfully updated the item.`) }
        this.snackBar.open( 'Project Created' , '', {
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




//         const project = {
//                       user_id: this.stitch.client.auth.user.id,
//                       groups: [{
//                                 group_name: this.group,
//                                 }]
//                       };
//     const projectCollection = this.stitch.mongodb.db('myApp').collection('groups');
//     projectCollection.insertOne(project).then((result) => { this.snackBar.open( 'Project Created' , '', {
//       duration: 2000,
//       verticalPosition: 'top'  });
//     this.router.navigate(['/people']); })
// .catch(err => { this.snackBar.open(err.message, '', {
//  duration: 3000,
//  verticalPosition: 'top' });
//  console.log(err);
//  this.router.navigate(['/project']);
// });
  }
}
