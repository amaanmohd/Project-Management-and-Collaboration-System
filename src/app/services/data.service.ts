import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private emailSource = new BehaviorSubject('');
currentEmail = this.emailSource.asObservable();
private projectSource = new BehaviorSubject('');
currentProject = this. projectSource.asObservable();
private createdSource = new BehaviorSubject('');
currentCreated = this.createdSource.asObservable();
private taskSource = new BehaviorSubject('');
currentTask = this.taskSource.asObservable();
  constructor() { }
  changeTask(task: string){
    this.taskSource.next(task);
  }
  changeEmail(email: string) {
    this.emailSource.next(email);
  }
  changeProject(project: string) {
    this.projectSource.next(project);
  }
  changeCreated(created: any){
    this.createdSource.next(created);
  }
}
