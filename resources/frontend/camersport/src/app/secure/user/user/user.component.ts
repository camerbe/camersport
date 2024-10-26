import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RedacteurService} from "../../../share/services/redacteur/redacteur.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  frmGroupUser!: FormGroup;
  isAddMode!:boolean;
  id!:number;
  label: string='Ajouter';
  constructor(
    private redacteurService:RedacteurService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router
  )
  {
    this.frmGroupUser=this.fb.group({
      nom:['',[Validators.required]],
      prenom:['',[Validators.required]],
      role:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['123456'],
      password_confirm:['123456'],
    })
  }

  get email(){
    return this.frmGroupUser.get('email');
  }
  get nom(){
    return this.frmGroupUser.get('nom');
  }
  get prenom(){
    return this.frmGroupUser.get('prenom');
  }
  get role(){
    return this.frmGroupUser.get('role');
  }
  get password(){
    return this.frmGroupUser.get('password');
  }get password_confirm(){
    return this.frmGroupUser.get('password_confirm');
  }
  onSubmit() {
    if(this.isAddMode){
      this.redacteurService.create(this.frmGroupUser.value)
        .subscribe({
          next:(res)=>{
            if(res.success){
              this.router.navigate(['dashboard/user/list'])

            }

          }
        })
    }
    else{
      this.redacteurService.update(this.id,this.frmGroupUser.value)
        .subscribe({
          next:(res)=>{
            res.success?
              this.router.navigate(['/dashboard/user/list']):
              this.router.navigate(['/dashboard/user/edit',this.id])
          }
        })
    }
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(`frmGroupUser: ${this.frmGroupUser.valid}`)
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      this.redacteurService.show(this.id)
        .subscribe({
          next:(res)=>{
            this.label='Mettre à jour';
            const redacteur=res['data']
            const arrFullName=redacteur.fullName.split(' ');
            const [name, ...rest]=arrFullName
            this.frmGroupUser.patchValue({
              nom:name,
              prenom:rest.join(" "),
              email:redacteur.email,
              role:redacteur.role
            });
          }
        })
    }
  }
}
