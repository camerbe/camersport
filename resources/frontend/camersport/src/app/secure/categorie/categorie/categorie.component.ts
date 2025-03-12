import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../../share/services/categorie/categorie.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent implements OnInit{
  frmGroupCategorie!: FormGroup;
  //categorie!: string;
  label: string='Ajouter';
  isAddMode!:boolean;
  id!:number;

  constructor(
    private categorieService:CategorieService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.frmGroupCategorie=this.fb.group({
      categorie:['',[Validators.required]],
    })
  }

  get categorie(){
    return this.frmGroupCategorie.get('categorie');
  }
  onSubmit() {
    if(this.isAddMode){
      this.categorieService.create(this.frmGroupCategorie.value)
        .subscribe({
          next:(res)=>{
            res.success?
              this.router.navigate(['/dashboard/categorie/list']):
              this.router.navigate(['/dashboard/categorie/add'])
          }
        })
    }
    else {
      this.categorieService.update(this.id,this.frmGroupCategorie.value)
        .subscribe({
          next:(res)=>{
            res.success?
              this.router.navigate(['/dashboard/categorie/list']):
              this.router.navigate(['/dashboard/categorie/edit',this.id])
          }
        })
    }
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.isAddMode=!this.id;
    if(!this.isAddMode){
      this.categorieService.show(this.id)
        .subscribe({
          next:(res)=>{
            this.label='Mettre à jour';
            const category=res['data']
            this.frmGroupCategorie.patchValue({
              categorie:category.categorie
            });
          }
        })
    }
  }
}
