import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MongoStitch } from '../services/stitch.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(public authService: AuthService,
    private router: Router,
   private snackBar: MatSnackBar,
   public stitch: MongoStitch
  ) { }

  ngOnInit() {
  }
logOutClick() {
  this.stitch.client.auth.logout();
  this.snackBar.open( 'Logged Out' , '', {
    duration: 3000,
    verticalPosition: 'top'
  });
  this.router.navigate(['/login']);
  return false;
}

}
