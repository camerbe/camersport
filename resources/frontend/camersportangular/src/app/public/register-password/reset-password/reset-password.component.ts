import { PasswordReset } from './../../../core/models/password-reset';
import { PasswordResetService } from './../../../services/password-reset.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  token!:string;
  fb:FormBuilder=inject(FormBuilder);
  frmReset!:FormGroup;
  authSevice:AuthService=inject(AuthService);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  router:Router=inject(Router);
  passwordResetService:PasswordResetService=inject(PasswordResetService);

  /**
   *
  */
 constructor() {
   this.frmReset=this.fb.group({
     email:[''],
     password:['',[Validators.required,
      Validators.minLength(6),
      CustomValidators.atLeastOneSpecialCharacter(),
      CustomValidators.atLeastOneUppercase()
    ]],
    confirmation:['',[Validators.required]],
    },
    {
      validators: CustomValidators.passwordsMatch('password', 'confirmation')
    });
  }
  get password()  {
    return  this.frmReset.get('password');
  }
  get confirmation()  {
    return  this.frmReset.get('confirmation');
  }
  ngOnInit(): void {
    this.token=this.activatedRoute.snapshot.params['token'];
  }

  onSubmit() {
    
    
    const resetPw: PasswordReset = {
      confirm_password: this.confirmation?.value,
      email:'camer@gmail.com',
      token:this.token,
      password:this.password?.value
    }
    this.passwordResetService.resetPassword(resetPw)
      .subscribe({
        next:() => this.router.navigate(['/login']),
        error:(err)=>console.log(err)
      })
  }
}
