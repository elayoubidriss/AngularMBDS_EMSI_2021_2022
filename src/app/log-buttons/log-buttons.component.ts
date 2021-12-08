import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-log-buttons',
  templateUrl: './log-buttons.component.html',
  styleUrls: ['./log-buttons.component.css']
})
export class LogButtonsComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  deco() {
    this.authService.logOut();
  }

  checkLog() {
    return this.authService.loggedIn;
  }

}
