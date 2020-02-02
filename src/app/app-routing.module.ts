import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './guard/auth.guard';
import { ResendComponent } from './resend/resend.component';
import { ProjectComponent } from './project/project.component';
import { PeopleComponent } from './people/people.component';
import { InfoComponent } from './info/info.component';
import { TaskComponent } from './task/task.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DataResolverService } from './data-resolver.service';
// import { DetailsComponent } from './details/details.component';
// import { DetailsAComponent } from './details-a/details-a.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'resend', component: ResendComponent},
  {path: 'project', component: ProjectComponent, canActivate: [AuthGuard]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
  {path: 'people', component: PeopleComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'task', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'projectDetails', component: ProjectDetailsComponent, canActivate: [AuthGuard]},
  // {path: 'details', component: DetailsComponent, canActivate: [AuthGuard], runGuardsAndResolvers : 'always' },
  // {path: 'details-a', component: DetailsAComponent, canActivate: [AuthGuard], runGuardsAndResolvers : 'always' },
  {path: 'taskdetails', component: TaskdetailsComponent, canActivate: [AuthGuard]},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [NavBarComponent,
  LoginComponent,
  HomeComponent,
  DashboardComponent,
  ProfileComponent,
RegisterComponent,
ResendComponent,
ProjectComponent,
PeopleComponent,
InfoComponent,
TaskComponent
];
