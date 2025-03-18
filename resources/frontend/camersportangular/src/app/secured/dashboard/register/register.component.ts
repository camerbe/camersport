import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  frmRegister!:FormGroup;
  title:string="ajout d'administrateur";
  link:string="/dashboard/register/list";
  label:string="Liste";
  isExpired!:boolean;

  userService: UserService=inject(UserService);
  fb:FormBuilder=inject(FormBuilder)
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);

  constructor() {
    this.frmRegister=this.fb.group({
      nom:['',[Validators.required]],
      prenom:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      role:['',[Validators.required]]
    })

  }
  ngOnInit(): void {
    this.expiredAtService.updateState(this.authService.isExpired())
    this.expiredAtService.state$.subscribe({
      next:(state)=>this.isExpired=state
    });
    if(this.isExpired) this.authService.logout()
  }

  get nom(){
    return this.frmRegister.get('nom')
  }
  get prenom(){
    return this.frmRegister.get('prenom')
  }
  get email(){
    return this.frmRegister.get('email')
  }
  get password(){
    return this.frmRegister.get('password')
  }
  get confirmpassword(){
    return this.frmRegister.get('confirmpassword')
  }
  get role(){
    return this.frmRegister.get('role')
  }

  onSubmit() {
    console.log(`this.frmRegister ${this.frmRegister.valid}`);
    this.userService.create(this.frmRegister.value)
      .subscribe({
        next:data=>console.log(data)
      })
  }



}
