import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrl: './register-password.component.css'
})
export class RegisterPasswordComponent implements OnInit{
  id!:number;
  // fb:FormBuilder=inject(FormBuilder);
  frmRegister!:FormGroup;
  // authSevice:AuthService=inject(AuthService);
  // activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  // router:Router=inject(Router);
  isBrowser!: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb:FormBuilder,
    private authSevice:AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      this.frmRegister=this.fb.group({
      password:['',[Validators.required,
        Validators.minLength(6),
        CustomValidators.atLeastOneSpecialCharacter(),
        CustomValidators.atLeastOneUppercase()
      ]],
      confirm:['',[Validators.required]],
    },{
      validators: CustomValidators.passwordsMatch('password', 'confirm')
    });

  }
   get categorie(){
    return this.frmRegister.get('password');
  }
  ngOnInit(): void {
    if(!this.isBrowser) return;
    this.id=this.activatedRoute.snapshot.params['id'];
  }
  onSubmit() {
    this.authSevice.changePassword(this.id,this.frmRegister.value)
      .subscribe({
        next:() => this.router.navigate(['/login'])
      });
  }

}
