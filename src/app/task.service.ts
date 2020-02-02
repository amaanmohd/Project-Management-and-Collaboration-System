import { Injectable } from '@angular/core';
import { MongoStitch } from './services/stitch.service';
export interface data {
  projects: [];
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private stitch : MongoStitch) { }
  getAssignProjects(){
    let assignProjects: any;
    const email = this.stitch.client.auth.user.profile.email;
    const query = {"member.email": email};
    const options = {projection: {project_name: true }}
    const projectCollection = this.stitch.mongodb.db('myApp').collection('members');
    projectCollection.find(query, options).toArray()
    .then(items => {
      assignProjects = items;
      console.log(`Successfully found ${items.length} assignProjects.`)
  }).catch(err => console.error(`Failed to find documents: ${err}`))
  return assignProjects;

  }
getCreatedProjects(){
  let createdProjects;
  const query1 = {user_id: this.stitch.client.auth.user.id};
  const options1 = {projection: {projects: true }}
  const projectCollection1 = this.stitch.mongodb.db('myApp').collection('projects');
  projectCollection1.find(query1, options1).toArray()
    .then(result => {
      if(result.length != 0) {
      console.log(result)
      createdProjects = result[0]['projects'];
      } else {
        console.log("You don't have any project created by you")
      }
    })
    .catch(err => console.error(`Failed to find document: ${err}`))
    return createdProjects;
}
getCreatedTasks(createdProjects){
  let createdTasks: any;
  let allCreatedTasks = [];
    createdProjects.forEach(element => {
    console.log(element.project_name);
        const query3 = {project_name: element.project_name};
      const options3 = {projection: {tasks: true, project_name: true }}
      const taskCollection = this.stitch.mongodb.db('myApp').collection('tasks');
      taskCollection.find(query3, options3).toArray()
      .then(items3 => {
        createdTasks = items3;
        console.log(createdTasks)
        for (let i = 0; i < createdTasks.length; i++) {
          for (let j = 0; j < createdTasks[i]['tasks'].length; i++) {
            allCreatedTasks.push(createdTasks[i]['tasks'][j]);
          }
        }
        console.log(allCreatedTasks);
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))
    })
    return allCreatedTasks;
}
  getAssignTasks(assignProjects){
    let assignTasks;
    let allAssignTasks=[];
    assignProjects.forEach(element => {
      console.log(element.project_name);
          const query2 = {project_name: element.project_name};
        const options2 = {projection: {tasks: true, project_name: true }}
        const taskCollection = this.stitch.mongodb.db('myApp').collection('tasks');
        taskCollection.find(query2, options2).toArray()
        .then(items2 => {
          assignTasks = items2;
          console.log(`Successfully found ${items2.length} documents.`)
          for (let i = 0; i < assignTasks.length; i++) {
            for (let j = 0; j < assignTasks[i]['tasks'].length; i++) {
              allAssignTasks.push(assignTasks[i]['tasks'][j]);
            }
          }
          console.log(allAssignTasks);

        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
      })
      return allAssignTasks;
  }
}

