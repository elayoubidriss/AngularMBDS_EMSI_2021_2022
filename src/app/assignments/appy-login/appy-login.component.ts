import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-appy-login',
  templateUrl: './appy-login.component.html',
  styleUrls: ['./appy-login.component.css']
})
export class AppyLoginComponent implements OnInit {
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private username = "user";
  private password = "userPassword";
  public uform:string | undefined;
  public pform:string | undefined;

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    for(var cre of this.authService.credentials) {
      if(this.uform == cre.username && this.pform == cre.password) {
        this.authService.logIn();
        this.router.navigate(['/home']);
        break;
      }
    }
    this.loginInvalid = true;
  }

}
