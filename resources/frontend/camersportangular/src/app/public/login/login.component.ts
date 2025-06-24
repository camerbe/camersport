import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Jwt } from '../../core/models/jwt';
import { JwtService } from '../../services/jwt.service';
import { JwtDecoded } from '../../core/models/jwt-decoded';
import { JwtPayload } from '../../core/models/jwt-payload';
import { Router } from '@angular/router';
import { PasswordReset } from '../../core/models/password-reset';
import { PasswordResetService } from '../../services/password-reset.service';
import Swal from "sweetalert2";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erreur!: string;
  frmLogin!: FormGroup;
  frmForgotPw!: FormGroup;
  token!:Jwt;
  visible:boolean=false;
  forgotPassword!:PasswordReset;
  isBrowser!: boolean;

  /**
   *
  */
 constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private authService: AuthService,
  private fb: FormBuilder,
  private fbPw: FormBuilder,
  private jwtService: JwtService,
  private router: Router,
  private passwordService: PasswordResetService

) {
  this.isBrowser = isPlatformBrowser(this.platformId);
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
  ngOnInit(): void {
    if(!this.isBrowser) return;
  }
  onSubmit() {
    if(!this.isBrowser) return;
    // const authService = inject(AuthService);
    // const router = inject(Router);
    if(isPlatformBrowser(this.platformId)) {
       this.authService.login(this.frmLogin.value)
    .subscribe({
      next:data =>{
        this.token=data;
        const decodedToken:JwtPayload=this.jwtService.DecodeToken(this.token.token)  as unknown as JwtPayload
        // console.log(this.token)
        // console.log(decodedToken)

          // localStorage.setItem('token',this.token.token);

          // localStorage.setItem('expiredAt', decodedToken.expires_in);
          // localStorage.setItem('fullname',decodedToken.fullName);
          // localStorage.setItem('userId',decodedToken.userId.toString());
          // localStorage.setItem('role',decodedToken.role.toString());

          this.safeLocalStorageSet('token', this.token.token);
          this.safeLocalStorageSet('expiredAt', decodedToken.expires_in);
          this.safeLocalStorageSet('fullname', decodedToken.fullName);
          this.safeLocalStorageSet('userId', decodedToken.userId.toString());
          this.safeLocalStorageSet('role', decodedToken.role.toString());
          //this.safeLocalStorageSet('token', this.token.token);
          //console.log(decodedToken.role);
          try{
            switch(decodedToken.role){
            case "Admin" :
            case "Redac" :

                this.router.navigate(['/secured/dashboard/register/list']);
                break;
              default :
                this.router.navigate(['login']);
            }
          }
          catch (e) {
            console.error('Error decoding token:', e);
          }



          },
          error:(error)=>this.erreur="Informations d'identification invalides"


      })
    }
    }

    private safeLocalStorageSet(key: string, value: string): void {
      if (this.isBrowser) {
        localStorage.setItem(key, value);
      }
    }




      showDialog() {
        this.visible=true;
      }
      get passwordResetEmail(){
        return this.frmForgotPw.get('email');
      }
      forgotPasswordSubmit() {
        this.visible=false;
        if(!this.isBrowser) return;
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
