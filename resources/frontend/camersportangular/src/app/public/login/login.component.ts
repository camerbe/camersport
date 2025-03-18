import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../../camersport/src/app/public/auth.service';
import { FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Jwt } from '../../core/models/jwt';
import { JwtService } from '../../services/jwt.service';
import { JwtDecoded } from '../../core/models/jwt-decoded';
import { JwtPayload } from '../../core/models/jwt-payload';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  erreur!: string;
  frmLogin!: FormGroup;
  token!:Jwt;

  authService:AuthService=inject(AuthService);
  fb:FormBuilder=inject(FormBuilder);
  jwtService:JwtService=inject(JwtService);
  router:Router=inject(Router);
  /**
   *
   */
  constructor() {
    this.frmLogin=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })

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
          switch(decodedToken.role){
              case "Admin" :
              case "Redac" :
                this.router.navigate(['/dashboard']);
                break;
            default :
              this.router.navigate(['login']);
          }

        },
        error:(error)=>this.erreur="Informations d'identification invalides"

      })
  }
}
