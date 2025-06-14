import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrl: './register-password.component.css'
})
export class RegisterPasswordComponent implements OnInit{
  id!:number;
  fb:FormBuilder=inject(FormBuilder);
  frmRegister!:FormGroup;
  authSevice:AuthService=inject(AuthService);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  router:Router=inject(Router);

  constructor() {
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
    this.id=this.activatedRoute.snapshot.params['id'];
  }
  onSubmit() {
    this.authSevice.changePassword(this.id,this.frmRegister.value)
      .subscribe({
        next:() => this.router.navigate(['/login'])
      });
  }

}
