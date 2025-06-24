import { PasswordReset } from './../../../core/models/password-reset';
import { PasswordResetService } from './../../../services/password-reset.service';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../shared/validators/custom-validators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  token!:string;
  // fb:FormBuilder=inject(FormBuilder);
  frmReset!:FormGroup;
  isBrowser!: boolean;
  // authSevice:AuthService=inject(AuthService);
  // activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  // router:Router=inject(Router);
  // passwordResetService:PasswordResetService=inject(PasswordResetService);

  /**
   *
  */
 constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private fb:FormBuilder,
  private authSevice:AuthService,
  private activatedRoute:ActivatedRoute,
  private router:Router,
  private passwordResetService:PasswordResetService
 ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
    if(!this.isBrowser) return;
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
