import {  Component, OnInit  } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { MatSnackBar } from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { TaskService } from '../task.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {
  constructor(private stitch: MongoStitch,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private taskData:TaskService,
    private data: DataService,
    private router: Router) { }
    allTasks1=[];

    createdTasks;
    allCreatedTasks=[];
    assignTasks;
    todo: string;
 assignProjects=[];
 tasks;
 allTasks=[];
 createdProjects=[];
  name = this.stitch.client.auth.user.profile.email ;
  ngOnInit(){
    const email = this.stitch.client.auth.user.profile.email;
    const query = {"member.email": email};
    const options = {projection: {project_name: true }}
    const projectCollection = this.stitch.mongodb.db('myApp').collection('members');
    projectCollection.find(query, options).toArray()
    .then(items => {
      this.assignProjects = items;
        this.assignProjects.forEach(element => {
              const query2 = {project_name: element.project_name};
            const options2 = {projection: {tasks: true}}
            const taskCollection = this.stitch.mongodb.db('myApp').collection('tasks');
            taskCollection.find(query2, options2).toArray()
            .then(items2 => {
              this.assignTasks = items2;
              console.log('assigntask' ,this.assignTasks);

              for (let i = 0; i < this.assignTasks.length; i++) {
                this.assignTasks[i]['tasks'].forEach(element => {
                  this.allTasks.push(element);
                });
              }
              console.log('allassign', this.allTasks);

            })
            .catch(err => console.error(`Failed to find documents: ${err}`))
          })


      const query1 = {user_id: this.stitch.client.auth.user.id};
    const options1 = {projection: {projects: true }}
    const projectCollection1 = this.stitch.mongodb.db('myApp').collection('projects');
    projectCollection1.find(query1, options1).toArray()
      .then(result => {
        if(result.length != 0) {
          console.log(result);

        this.createdProjects = result[0]['projects'];
        console.log(this.createdProjects)
        this.createdProjects.forEach(element => {
        const query3 = {project_name: element.project_name};
      const options3 = {projection: {tasks: true }}
      const taskCollection = this.stitch.mongodb.db('myApp').collection('tasks');
      taskCollection.find(query3, options3).toArray()
      .then(items3 => {
        this.createdTasks = items3;
console.log('created tasks',this.createdTasks);

        for (let i = 0; i < this.createdTasks.length; i++) {
          this.createdTasks[i]['tasks'].forEach(element => {
            this.allTasks.push(element);
          });
        }

console.log('allcreated', this.allTasks)
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))
    })

        } else {
          console.log("You don't have any project created by you")
        }
      })
      .catch(err => console.error(`Failed to find document: ${err}`))
  }).catch(err => console.error(`Failed to find documents: ${err}`))
}

detail(project){
  this.data.changeProject(project)
  this.router.navigate(['/details']);
}

detailA(project){
  this.data.changeProject(project)
  this.router.navigate(['/details-a']);
}

detailT(task){
  this.data.changeTask(task)
  this.router.navigate(['/taskdetails']);
}
  openBottomSheet(): void {
    this.data.changeCreated(this.createdProjects);
    this.bottomSheet.open(BottomSheetOverviewSheet);
  }
}
@Component({
  selector: 'bottom-sheet-overview-sheet',
  templateUrl: 'bottom-sheet-overview-sheet.html',
})
export class BottomSheetOverviewSheet implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>,
    private stitch: MongoStitch,
    private data:DataService) {}
  projects;
  project;
  ngOnInit(){
    this.data.currentCreated.subscribe(created => this.projects =created);
  }
  openLink(event: MouseEvent, project): void {
    this.data.changeProject(project);
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
