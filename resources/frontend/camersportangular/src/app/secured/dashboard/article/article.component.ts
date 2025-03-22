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
import { Competition } from '../../../core/models/competition';
import { CompetitionDetail } from '../../../core/models/competition-detail';
import { first } from 'rxjs';
import { log } from 'console';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  motclefRegex :RegExp= /^([a-zA-ZÀ-ÿ0-9 ]{4,},\s*){2,}[a-zA-ZÀ-ÿ0-9 ]{4,}$/;
  hashtagRegex :RegExp= /^(#[A-Za-z0-9_]{4,},){2,}#[A-Za-z0-9_]{4,}$/;



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
  competitions:CompetitionDetail[]=[];
  selectedCategorieId!:Number;
  selectedCompetitionId!:Number;
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
  hashtagExtractorService:HashtagExtractorService=inject(HashtagExtractorService);

  constructor() {
    const now = new Date();
    this.frmArticle=this.fb.group({
      titre:['',[Validators.required,Validators.maxLength(100)]],
      auteur:['',Validators.required],
      source:['',Validators.required],
      article:['',Validators.required],
      image:['',Validators.required],
      date_parution :[new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,-1),Validators.required],
      user_id :[Number(localStorage.getItem("userId")),Validators.required],
      categorie_id :['',Validators.required],
      competition_id :['',Validators.required],
      pays_code :['',Validators.required],
      motclef:['',[Validators.pattern(this.motclefRegex)]],
      hashtag:['',[Validators.pattern(this.hashtagRegex)]],
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
  get competition_id(){
    return this.frmArticle.get('competition_id');
  }
  get pays_code(){
    return this.frmArticle.get('pays_code');
  }
  onSubmit() {
    ///console.log(this.frmArticle.valid);
    if(this.isAddMode){

      //console.log(this.frmArticle.value);
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
    this.selectedCategorieId = +target.value;
    this.frmArticle.patchValue({categorie_id:+target.value});
  }

  onChangePays($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.selectedPaysCode = target.value;
    this.frmArticle.patchValue({pays_code:target.value});

  }
  onChangeCompetition($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.selectedCompetitionId = +target.value;
    this.frmArticle.patchValue({competition_id:+target.value});

  }
  private getCountries(){
    return this.articleService.getCountries()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Pays;
        this.countries=tempData["data"] as unknown as PaysDetail[];
        return this.countries;
      }
    });
  }
  private getCompetition(){
    return this.articleService.getCompetitions()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Competition;
        this.competitions=tempData["data"] as unknown as CompetitionDetail[];
        return this.competitions;
      }
    });
  }
  private getCategories(){
    return this.articleService.getCategories()
    .subscribe({
      next:(data) =>{
        const tempData=data as unknown as Categorie;
        this.categories=tempData["data"] as unknown as CategorieDetail[];
        return this.categories;
      }
    });
  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();

    this.getCategories();
    this.getCountries();
    this.getCompetition();

    if(!this.isAddMode){
          this.title="mise à jour d'article";
          this.erreur="";
          this.articleService.show(this.id)
            .pipe(first())
            .subscribe({
              next:data=>{
                const resData=data["data"] as ArticleDetail
                const hashtags=this.hashtagExtractorService.extractHashtags(resData.motclef);
                const motscles=this.hashtagExtractorService.removeHashtags(resData.motclef);

                this.frmArticle.patchValue(
                  {
                    categorie_id:resData.categorie.id,
                    hashtag:hashtags.trim(),
                    motclef:motscles.substring(0,motscles.length-1).replace(/, /g,','),
                    competition_id:resData.categorie.competitions[0].id
                  }
                );

                this.frmArticle.patchValue(resData);
                console.log(this.frmArticle.value);

              },
              error:err=>
                {
                  this.erreur=err.error
                  console.log(err.error);
                  console.log(`erreur: ${this.erreur}`);
                }
            })

    }




  }

}
