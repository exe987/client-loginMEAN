import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-privatehome',
  templateUrl: './privatehome.component.html',
  styleUrls: ['./privatehome.component.css'],
})
export class PrivatehomeComponent implements OnInit {
  user;
  now = new Date();
  date;

  constructor(private authService: AuthService, private router: Router) {}

  formatDate() {
    this.date = dateFormat(this.now, 'dddd, mmmm dS, yyyy');
    return this.date;
  }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (res) => {
        this.user = res;
        this.formatDate();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
