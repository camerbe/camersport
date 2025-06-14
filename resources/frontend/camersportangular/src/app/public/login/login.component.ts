import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from './../../../../../camersport/src/app/public/auth.service';
import { FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Jwt } from '../../core/models/jwt';
import { JwtService } from '../../services/jwt.service';
import { JwtDecoded } from '../../core/models/jwt-decoded';
import { JwtPayload } from '../../core/models/jwt-payload';
import { Router } from '@angular/router';
import { PasswordReset } from '../../core/models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  erreur!: string;
  frmLogin!: FormGroup;
  frmForgotPw!: FormGroup;
  token!:Jwt;
  visible:boolean=false;
  forgotPassword!:PasswordReset;

  authService:AuthService=inject(AuthService);
  fb:FormBuilder=inject(FormBuilder);
  fbPw:FormBuilder=inject(FormBuilder);
  jwtService:JwtService=inject(JwtService);
  router:Router=inject(Router);
  passwordService:PasswordResetService=inject(PasswordResetService);
  /**
   *
  */
 constructor() {
   this.frmLogin=this.fb.group({
     email:['',[Validators.required,Validators.email]],
     password:['',[Validators.required]],
    });
    this.frmForgotPw=this.fbPw.group({
      email:['',[Validators.required,Validators.email]],
      password: [''],
      confirm_password: [''],
      token: [''],

    });


  }
  onSubmit() {
    this.authService.login(this.frmLogin.value)
    .subscribe({
      next:data =>{
        this.token=data;
        const decodedToken:JwtPayload=this.jwtService.DecodeToken(this.token.token)  as unknown as JwtPayload
        // console.log(this.token)
        // console.log(decodedToken)
        localStorage.setItem('token',this.token.token);
        localStorage.setItem('expiredAt', decodedToken.expires_in);
        localStorage.setItem('fullname',decodedToken.fullName);
        localStorage.setItem('userId',decodedToken.userId.toString());
        localStorage.setItem('role',decodedToken.role.toString());
        switch(decodedToken.role){
          case "Admin" :
            case "Redac" :
              this.router.navigate(['/secured/dashboard']);
              break;
              default :
              this.router.navigate(['login']);
            }

          },
          error:(error)=>this.erreur="Informations d'identification invalides"

        })
      }
      showDialog() {
        this.visible=true;
      }
      get passwordResetEmail(){
        return this.frmForgotPw.get('email');
      }
      forgotPasswordSubmit() {
        this.visible=false;
        console.log(this.forgotPassword);
        this.forgotPassword = {
          email: this.passwordResetEmail?.value,
          password: '',
          confirm_password: '',
          token: ''
        }
        if(this.frmForgotPw){
          this.passwordService.forgot(this.forgotPassword)
            .subscribe({
              next: () => {
                Swal.fire("Un lien de réinitialisation de votre mot de passe a été envoyé à l'adresse e-mail associée à votre compte.");
              }
            })
        }
      }
}
