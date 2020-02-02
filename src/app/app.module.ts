import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent, BottomSheetOverviewSheet } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MongoComponent } from './mongo/mongo.component';
import { ValidateService } from './services/validate.service';
import { AngularMaterialModule } from './angular-material.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ResendComponent } from './resend/resend.component';
import { ProjectComponent } from './project/project.component';
import { PeopleComponent } from './people/people.component';
import { InfoComponent } from './info/info.component';
import { TaskComponent } from './task/task.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { DashboardModule } from './dashboard.module';
import { DataResolverService } from './data-resolver.service';
// import { DetailsComponent, DialogOverviewExampleDialog } from './details/details.component';
// import { DetailsAComponent } from './details-a/details-a.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { EventsComponent } from './events/events.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterComponent,
    MongoComponent,
    ResendComponent,
    ProjectComponent,
    PeopleComponent,
    InfoComponent,
    TaskComponent,
    BottomSheetOverviewSheet,
    ProjectDetailsComponent,
  
    // DetailsAComponent,
    // DialogOverviewExampleDialog,
    TaskdetailsComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
     DashboardModule,
  ],
  entryComponents: [BottomSheetOverviewSheet],
  providers: [ValidateService , AuthService, AuthGuard, DataResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
