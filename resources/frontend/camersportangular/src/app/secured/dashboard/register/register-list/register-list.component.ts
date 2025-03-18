import { Component, inject, OnInit } from '@angular/core';
import { Init } from 'v8';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../services/user.service';
import { combineLatest, map, tap } from 'rxjs';
import { UserDetails } from '../../../../core/models/user-details';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrl: './register-list.component.css'
})
export class RegisterListComponent implements OnInit{
  users:UserDetails[]=[];
  utilisateur:User[]=[];
  title:string="Liste des administrateurs";
  isExpired!:boolean;
  link:string="/dashboard/register";
  label:string="+ Créer";

  userService:UserService=inject(UserService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);

  ngOnInit(): void {
    this.expiredAtService.updateState(this.authService.isExpired())
    this.expiredAtService.state$.subscribe({
      next:(state)=>this.isExpired=state
    });
    if(this.isExpired) this.authService.logout()
    this.userService.getAll().subscribe({
      next:(res) =>{
        const tmpData=res as unknown as User
        this.users=tmpData.data
      },
      error:(error)=>console.log(error)
    })

  }

}
