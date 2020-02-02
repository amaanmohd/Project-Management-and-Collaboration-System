import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TaskService , data } from './task.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<data>{

  constructor(private taskData: TaskService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<data> {
    return this.taskData.getCreatedProjects();
}

}
