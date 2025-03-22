import { Component, inject, OnInit } from '@angular/core';
import { Init } from 'v8';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../services/user.service';
import { combineLatest, map, tap } from 'rxjs';
import { UserDetails } from '../../../../core/models/user-details';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  id!:number;
  isAddMode!:boolean


  userService:UserService=inject(UserService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);
  activedRoute:ActivatedRoute=inject(ActivatedRoute);

  onDelete(id: number) {
    const swalWithTailwindButtons=Swal.mixin({
              customClass:{
                container: 'bg-gray-800',
                popup: 'rounded-lg p-4 shadow-lg',
                title: 'text-2xl font-bold text-gray-600',
                //content: 'text-md text-gray-200',
                confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
                cancelButton: 'mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
              },
              buttonsStyling: false
            })
            swalWithTailwindButtons.fire({
              title: 'Êtes-vous sûr?',
              text: "De vouloir supprimer cet utilisateur !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Supprimer',
              cancelButtonText: 'Annuler ',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                this.userService.delete(id)
                .subscribe({
                  next: () => {
                    this.users = this.users.filter((user) => user.id !== id);
                  },
                  error:()=>() => { }
                })
                swalWithTailwindButtons.fire(
                  'Supprimé!',
                  "L'utilisateur' a été supprimé.",
                  'success'
                )
              }
            }
            )
  }
  ngOnInit(): void {
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
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
    });

  }

}


