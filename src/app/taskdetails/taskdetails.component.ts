import { Component, OnInit } from '@angular/core';
import { MongoStitch } from '../services/stitch.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Stitch } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {
  task_name: string;
  createdTasks: any;
  allTasks: any;
  taskList=[];
  description: any;
  date: any;
  file: any;
  base64textString: string;

  constructor(  private stitch: MongoStitch,
    private data:DataService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.currentTask.subscribe(task => this.task_name = task);
    const query1 = {'tasks.task_name': this.task_name};
    const options1 = {projection: {tasks: true }}
    const projectCollection1 = this.stitch.mongodb.db('myApp').collection('tasks');
    projectCollection1.find(query1, options1).toArray()
      .then(result => {
        console.log(result)
      //   if(result.length != 0) {
        this.taskList = result[0]['tasks'];
        this.taskList.forEach(element => {
          if (element.task_name == this.task_name) {
              this.task_name = element.task_name;
              this.description = element.task_description;
              this.date = element.date;}})
      //         const query3 = {project_name: element.project_name};
      //         const options3 = {projection: {tasks: true }}
      //         const taskCollection = this.stitch.mongodb.db('myApp').collection('tasks');
      //         taskCollection.find(query3, options3).toArray()
      //         .then(items3 => {
      //           this.createdTasks = items3;
      //   console.log('created tasks',this.createdTasks);
      //           for (let i = 0; i < this.createdTasks.length; i++) {
      //             this.createdTasks[i]['tasks'].forEach(element => {
      //               this.allTasks.push(element);
      //             });
      //           }
      //   console.log('allcreated', this.allTasks)
      //         })
      //         .catch(err => console.error(`Failed to find documents: ${err}`))
      //     }
      //   });
      //   console.log(this.createdProjects)


      //   } else {
      //     console.log("You don't have any project created by you")
      //   }
      // })
      })
      .catch(err => console.error(`Failed to find document: ${err}`))
      }

    initialiseInvites() {
      // Set default values and re-fetch any data you need.
    }
      // delete(taskName){
      //   const query = {user_id: this.stitch.client.auth.user.id , project_name: this.project_name}
      //   const update = {
      //     $pull: {
      //       tasks: {
      //         task_name: taskName,
      //       }
      //     }
      //   }
      //   const option = {upsert: false};
      //   const taskcollection = this.stitch.mongodb.db('myApp').collection('tasks');
      //   taskcollection.updateOne(query, update, option)
      //   .then(result => {
      //     const { matchedCount, modifiedCount } = result;
      //       if(matchedCount && modifiedCount)
      //       { console.log(`Successfully updated the item.`)}
      //       this.router.navigate(['/dashboard']);
      //     })
      //   .catch(err => console.error(`Failed to update the item: ${err}`))

      //     }
          onFileSelected(evt){
              var files = evt.target.files;
               this.file = files[0];
               console.log(this.file)
            if (files && this.file) {
                var reader = new FileReader();
                reader.onload =this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(this.file);
            }

          }
          _handleReaderLoaded(readerEvt) {
            var binaryString = readerEvt.target.result;
                   this.base64textString= btoa(binaryString);
                   console.log(btoa(binaryString));
           }

          upload() {
              const client = Stitch.defaultAppClient;
              client.callFunction("s3p", [ this.base64textString, 'amaan9627','amaan.jpg', this.file.type]).then(result => {
                  console.log(result)
              }).catch(err => {console.log(err)});
          }
          getFile(){
            const client = Stitch.defaultAppClient;
            client.callFunction("s3g", ['amaan.jpg']).then(result => {
              console.log(result);
            }).catch(err => {console.log(err)});

          }
}
