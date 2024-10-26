import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileObservableService} from "../../share/services/profile-observable.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  frmGroupLogin!:FormGroup;
  constructor(
    private authService:AuthService,
    private profileObservableService:ProfileObservableService,
    private fb:FormBuilder,
    private router:Router

  ) {
      this.frmGroupLogin=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
  }

  get email(){
    return this.frmGroupLogin.get('email');
  }
  get password(){
    return this.frmGroupLogin.get('password');
  }

  onSubmit() {
    //console.log(this.frmGroupLogin.value);
    this.authService.login(this.frmGroupLogin.value)
      .subscribe({
        next:(res)=>{
          const user=res['user']
          switch (res.message){
            case  'verify_mail' :
            case 'change_password':
              this.router.navigate(['changePassword',btoa(user.email)]);
              break;
            default:
              localStorage.setItem('expires_at',res.expires_at.toString());
              localStorage.setItem('token',res.token);
              this.profileObservableService.setProfileObs(user);
              this.router.navigate(['dashboard']);
              break;
          }
        }
      })

  }
}
