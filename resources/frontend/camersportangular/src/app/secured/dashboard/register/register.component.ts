import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserDetails } from '../../../core/models/user-details';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  frmRegister!:FormGroup;
  title:string="ajout d'administrateur";
  link:string="/secured/dashboard/register/list";
  label:string="Liste";
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:number;
  erreur!:string;
  //competitions:Competition[]=[];
  frmCompetition!:FormGroup;

  userService: UserService=inject(UserService);
  fb:FormBuilder=inject(FormBuilder)
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);
  router:Router=inject(Router);
  activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  constructor() {
    this.frmRegister=this.fb.group({
      nom:['',[Validators.required]],
      prenom:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['123456',Validators.required],
      confirmpassword:['',Validators.required],
      role:['',[Validators.required]]
    })

  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authService.isExpired())
    this.expiredAtService.state$.subscribe({
      next:(state)=>this.isExpired=state
    });
    if(this.isExpired) this.authService.logout()
    if(!this.isAddMode){
     this.title="mise à jour d'utilisateur";

    this.userService.show(this.id)
             .pipe(first())
             .subscribe({
               next:data=>{
                 const resData=data["data"] as unknown as UserDetails
                 this.frmRegister.patchValue(resData);
                 //console.log(resData);

               },
               error:err=>this.erreur=err.error
             });
    }
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
    if(this.isAddMode){
      this.userService.create(this.frmRegister.value)
      .subscribe({
        next:()=>this.router.navigate(['/dashboard/register/list']),
        error:(error)=>console.log(error)
      });
    }
    else{
      this.userService.patch(this.id,this.frmRegister.value)
      .subscribe({
        next:()=>this.router.navigate(['/dashboard/register/list'])
      });
    }
  }



}
