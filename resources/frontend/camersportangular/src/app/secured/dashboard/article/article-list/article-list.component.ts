import { Component, inject, OnInit } from '@angular/core';
import { ArticleDetail } from '../../../../core/models/article-detail';
import { Article } from '../../../../core/models/article';
import { ArticleService } from '../../../../services/article.service';
import { ExpiredAtService } from '../../../../services/expired-at.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  selectedProducts: any;
  deleteSelectedProducts() {
  throw new Error('Method not implemented.');
  }
  openNew() {
  throw new Error('Method not implemented.');
  }

  title:string="Liste des articles";
  isExpired!:boolean;
  link:string="/secured/dashboard/article";
  label:string="+ Créer";
  articles:ArticleDetail[]=[];
  art:Article[]=[];
  article!:ArticleDetail;
  id!:number;
  slug!:string;
  isAddMode!:boolean

  articleService:ArticleService=inject(ArticleService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  authService:AuthService=inject(AuthService);
  activedRoute:ActivatedRoute=inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.id=this.activedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;

    this.expiredAtService.updateState(this.authService.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authService.logout();

    this.articleService.getAll()
    .subscribe({
      next:(data) =>{
        const userId=Number(localStorage.getItem('userId'));

        const tempData=data as unknown as Article;
        this.articles=tempData["data"] as unknown as ArticleDetail[];
        console.log(this.articles);
        this.articles=this.articles.filter(article=>article.user.id==userId);
      },
      error:(error)=>console.log(error)
    });

  }
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
          text: "De vouloir supprimer cet article !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Supprimer',
          cancelButtonText: 'Annuler ',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.articleService.delete(id)
            .subscribe({
              next: () => {
                this.articles = this.articles.filter((article) => article.id !== id);
              },
              error:()=>() => { }
            })
            swalWithTailwindButtons.fire(
              'Supprimé!',
              "L' article a été supprimé.",
              'success'
            )
          }
        }
        )
  }

}
