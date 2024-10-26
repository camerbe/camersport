import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  frmGroupPasswordChange!: FormGroup;
  emailAdress!:string;

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
  ) {
      this.frmGroupPasswordChange=this.fb.group({
        email:[''],
        confirm_password:['',[Validators.required]],
        password:['',[Validators.required]],
      })
  }

  get confirm_password(){
    return this.frmGroupPasswordChange.get('confirm_password');
  }
  get password(){
    return this.frmGroupPasswordChange.get('password');
  }
  get email(){
    return this.frmGroupPasswordChange.get('email');
  }

  onSubmit() {
    this.frmGroupPasswordChange.patchValue({
      email:this.emailAdress
    })
    console.log(this.frmGroupPasswordChange.value)
    this.authService.changePassword(this.frmGroupPasswordChange.value)
      .subscribe({
        next:(res)=>{
          if(res.success==true){
            this.router.navigate(['login'])
          }
        }
      })
  }

  ngOnInit(): void {
    this.emailAdress=this.route.snapshot.params['email'];
  }
}
