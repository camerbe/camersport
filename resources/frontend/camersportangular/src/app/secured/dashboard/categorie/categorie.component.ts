import { ExpiredAtService } from './../../../services/expired-at.service';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CategorieService } from '../../../services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { CategorieDetail } from '../../../core/models/categorie-detail';
import { first } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements OnInit{

  // fb:FormBuilder=inject(FormBuilder);
  // authSevice:AuthService=inject(AuthService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // categorieService:CategorieService=inject(CategorieService);
  // router:Router=inject(Router);
  // activatedRoute:ActivatedRoute=inject(ActivatedRoute);


  title:string="ajout catégorie";
  link:string="/secured/categorie/list";
  label:string="Liste";
  isExpired!:boolean;
  frmCategorie!:FormGroup;
  id!:number;
  isAddMode!:boolean;
  erreur!:string;
  cate!:CategorieDetail;

  isBrowser!: boolean;
  /**
   *
  */
 constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
  private fb:FormBuilder,
  private authSevice:AuthService,
  private expiredAtService:ExpiredAtService,
  private categorieService:CategorieService,
  private router:Router,
  private activatedRoute:ActivatedRoute
) {
  this.isBrowser = isPlatformBrowser(this.platformId);
   this.frmCategorie=this.fb.group({
     categorie:['',Validators.required]
    })

  }
  get categorie(){
    return this.frmCategorie.get('categorie');
  }
  onSubmit() {
    if(this.isAddMode){
      this.categorieService.create(this.frmCategorie.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/categorie/list']),
          error:(error)=>console.log(error)
        });
    }
    else{

      this.categorieService.patch(this.id,this.frmCategorie.value)
        .subscribe({
          next:()=>this.router.navigate(['/secured/categorie/list'])
        });
    }

  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
      this.title="mise à jour de catégorie";

      this.categorieService.show(this.id)
        .pipe(first())
        .subscribe({
          next:data=>{
            const resData=data["data"] as CategorieDetail
            this.frmCategorie.patchValue(resData);
            console.log(`${this.frmCategorie.value}`)
          },
          error:err=>this.erreur=err.error
        })

    }
  }

}
