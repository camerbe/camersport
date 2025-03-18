import { Component, inject, OnInit } from '@angular/core';
import { ArticleDetail } from '../../../core/models/article-detail';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieDetail } from '../../../core/models/categorie-detail';
import { Categorie } from '../../../core/models/categorie';
import { PaysDetail } from '../../../core/models/pays-detail';
import { Pays } from '../../../core/models/pays';
import { environment } from '../../../../environments/environment.development';
import tinymce from 'tinymce';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
addControl() {
throw new Error('Method not implemented.');
}
removeMotClef(_t123: number) {
throw new Error('Method not implemented.');
}
  motclefRegex :RegExp= /^\s*\b\w{4,}\b(?:\s*,\s*\b\w{4,}\b){2,}\s*$/;
  hashtagRegex :RegExp= /^(#\w{4,})(?:,#\w{4,}){2,}$/;

  frmArticle!:FormGroup;
  title:string="Ajout article";
  link:string="/dashboard/article/list";
  label:string="Liste";
  isExpired!:boolean;
  isAddMode!:boolean;
  id!:number;
  erreur!:string;
  articles:ArticleDetail[]=[];
  categories:CategorieDetail[]=[];
  countries:PaysDetail[]=[];
  selectedCategorieId!:Number;
  selectedPaysCode!:string;
  initImage={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: false,
    //toolbar_sticky: true,

    // @ts-ignore
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      //var cmsURL = `${environment.baseUrl}api/laravel-filemanager?editor=` + meta.fieldname;
      var cmsURL = `${environment.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;
      //const targetOrigin = "http://localhost:8000";

      if (meta.filetype == 'image') {

        cmsURL = cmsURL + "&type=Images";
        //console.log(`cmsURL: ${cmsURL}`);
      }
      else {
        cmsURL = cmsURL + "&type=Files";
        //console.log(`cmsURL: ${cmsURL}`);
      }

      // @ts-ignore
      // @ts-ignore

      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Camer-Sport',
        width : x * 0.8,
        height : y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',
        // @ts-ignore
        onMessage: (api, message) => {
          callback(message['content'])
        }

      });
    },
    plugins: [
      'image', 'media'
    ],
    toolbar:' image media '
  }
  init={
    path_absolute : "/",
    relative_urls: false,
    base_url: '/tinymce',
    suffix: '.min',
    height: 450,
    menubar: 'file edit view insert format tools table tc help',
    toolbar_sticky: false,

    // @ts-ignore
    file_picker_callback : function(callback, value, meta) {
      var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      var y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      //var cmsURL = `${environment.baseUrl}api/laravel-filemanager?editor=` + meta.fieldname;
      var cmsURL = `${environment.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;
      //const targetOrigin = "http://localhost:8000";

      if (meta.filetype == 'image') {

        cmsURL = cmsURL + "&type=Images";
        //console.log(`cmsURL: ${cmsURL}`);
      }
      else {
        cmsURL = cmsURL + "&type=Files";
        //console.log(`cmsURL: ${cmsURL}`);
      }

      // @ts-ignore
      // @ts-ignore

      tinymce.activeEditor.windowManager.openUrl({
        url : cmsURL,
        title : 'Camer-Sport',
        width : x * 0.8,
        height : y * 0.8,
        //resizable : 'yes',
        //close_previous : 'no',
        // @ts-ignore
        onMessage: (api, message) => {
          callback(message['content'])
        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount','code'
    ],
    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  };

  fb:FormBuilder=inject(FormBuilder);
  authSevice:AuthService=inject(AuthService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  articleService:ArticleService=inject(ArticleService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  constructor() {
    const now = new Date();
    this.frmArticle=this.fb.group({
      titre:['',[Validators.required,Validators.maxLength(100)]],
      auteur:['',Validators.required],
      source:['',Validators.required],
      article:['',Validators.required],
      image:['',Validators.required],
      date_parution :[new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,-1),Validators.required],
      user_id :['',Validators.required],
      categorie_id :['',Validators.required],
      pays_code :['',Validators.required],
      motclef:['',Validators.pattern(this.motclefRegex)],
      hashtag:['',Validators.pattern(this.hashtagRegex)],
    });
  }

  get motclef()  {
    return  this.frmArticle.get('motclef');
  }
  get hashtag()  {
    return  this.frmArticle.get('hashtag');
  }

  get titre(){
    return this.frmArticle.get('titre');
  }
  get auteur(){
    return this.frmArticle.get('auteur');
  }
  get source(){
    return this.frmArticle.get('source');
  }
  get article(){
    return this.frmArticle.get('article');
  }
  get image(){
    return this.frmArticle.get('image');
  }
  get date_parution(){
    return this.frmArticle.get('date_parution');
  }
  get user_id(){
    return this.frmArticle.get('user_id');
  }
  get categorie_id(){
    return this.frmArticle.get('categorie_id');
  }
  get pays_code(){
    return this.frmArticle.get('pays_code');
  }
  onSubmit() {
    if(this.isAddMode){
      this.articleService.create(this.frmArticle.value)
      .subscribe({
        next:()=>this.router.navigate(['/dashboard/article/list']),
        error:(error)=>console.log(error)
      });
    }
    else{

      this.articleService.patch(this.id,this.frmArticle.value)
      .subscribe({
        next:()=>this.router.navigate(['/dashboard/article/list'])
      });
    }
  }
  onChange($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.selectedCategorieId = Number(target.value);
    this.frmArticle.patchValue({categorie_id:this.selectedCategorieId});
  }
  onChangePays($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.selectedPaysCode = target.value;
    this.frmArticle.patchValue({pays_code:this.selectedPaysCode});
  }
  getCountries(){
    return this.articleService.getCountries()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Pays;
        this.countries=tempData["data"] as unknown as PaysDetail[];
        return this.countries;
      }
    });
  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    //this.selectedPaysCode="0";
    //this.selectedCategorieId=0;
    this.getCountries();
    this.articleService.getCategories()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Categorie;
        this.categories=tempData["data"] as unknown as CategorieDetail[];

      }
    });




  }

}
