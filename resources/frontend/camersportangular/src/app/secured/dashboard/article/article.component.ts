import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
//import tinymce from 'tinymce';
import { Competition } from '../../../core/models/competition';
import { CompetitionDetail } from '../../../core/models/competition-detail';
import { first } from 'rxjs';
import { HashtagExtractorService } from '../../../services/hashtag-extractor.service';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [DatePipe]
})
export class ArticleComponent implements OnInit,AfterViewInit {

  motclefRegex :RegExp= /^([a-zA-ZÀ-ÿ0-9 ]{4,},\s*){2,}[a-zA-ZÀ-ÿ0-9 ]{4,}$/;
  hashtagRegex :RegExp= /^(#[A-Za-z0-9_]{4,},){2,}#[A-Za-z0-9_]{4,}$/;

  frmArticle!:FormGroup;
  title:string="Ajout article";
  link:string="/secured/dashboard/article/list";
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

  isBrowser!: boolean;
  tinymce: any;
  initImage: any= {};
  init: any= {};
  isTinyMceLoaded = false;



  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private authSevice: AuthService,
    private expiredAtService: ExpiredAtService,
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hashtagExtractorService: HashtagExtractorService,
    private datePipe: DatePipe
  ) {
    const now = new Date();
    this.isBrowser = isPlatformBrowser(this.platformId);
    // if (this.isBrowser) {
    //   import('tinymce/tinymce').then(module => {
    //     this.tinymce = module.default;
    //   });
    // }
    const userId = this.isBrowser ? Number(localStorage.getItem("userId")) : null;
    this.frmArticle=this.fb.group({
      titre:['',[Validators.required,Validators.maxLength(100)]],
      auteur:['',Validators.required],
      source:['',Validators.required],
      article:['',Validators.required],
      image:['',Validators.required],
      date_parution :['',Validators.required],
      user_id :[userId,Validators.required],
      categorie_id :['',Validators.required],
      competition_id :['',Validators.required],
      pays_code :['',Validators.required],
      motclef:['',[Validators.pattern(this.motclefRegex),Validators.required]],
      hashtag:['',[Validators.pattern(this.hashtagRegex),Validators.required]],
    });

  }
  async ngAfterViewInit():  Promise<void> {
    if (!this.isBrowser) return;
    try {
      const tinymceModule = await import('tinymce');
      this.tinymce = tinymceModule.default;
      this.initTinyMceConfig();
      this.isTinyMceLoaded = true;
    } catch (error) {
      console.error('Error loading tinymce:', error);
      this.isTinyMceLoaded = false;
    }
  }
  initTinyMceConfig() {
    const baseConfig = {
      path_absolute: "/",
      relative_urls: false,
      base_url: '/tinymce',
      suffix: '.min',
      height: 450,
      file_picker_callback: (callback: any, value: any, meta: any) => {
        this.filePickerHandler(callback, value, meta);
      }
    };
    this.initImage = {
      ...baseConfig,
      menubar: false,
      plugins: ['image', 'media'],
      toolbar: 'image media'
    };
    this.init = {
      ...baseConfig,
      menubar: 'file edit view insert format tools table tc help',
      toolbar_sticky: false,
      plugins: [
        'image', 'media', 'tools', 'link', 'advlist',
        'autolink', 'lists', 'table', 'wordcount', 'code', 'searchreplace'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags blockquote'
    };
  }
  filePickerHandler(callback: any, value: any, meta: any) {
    const x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    const y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

    let cmsURL = `${environment.baseUrl}/laravel-filemanager?editor=${meta.fieldname}`;
    cmsURL += (meta.filetype == 'image') ? '&type=Images' : '&type=Files';

    this.tinymce.activeEditor.windowManager.openUrl({
      url: cmsURL,
      title: 'Camer-Sport',
      width: x * 0.8,
      height: y * 0.8,
      onMessage: (api: any, message: any) => {
        callback(message.content);
        api.close();
      }
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
    //console.log(this.frmArticle.valid);
    if(this.frmArticle.invalid) {
        this.frmArticle.markAllAsTouched();
        Object.entries(this.frmArticle.controls).forEach(([key, control]) => {
          if (control.invalid) {
            console.warn(`Champ "${key}" est invalide :`, control.errors);
          }
        });
        console.log('Form errors:', this.frmArticle.errors);
        console.log('Form invalid!', this.frmArticle);
        return;
      }
    if(this.isAddMode){

      //console.log(this.frmArticle.value);
      this.articleService.create(this.frmArticle.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/article/list']),
        error:(error)=>console.log(error)
      });
    }
    else{

      this.articleService.patch(this.id,this.frmArticle.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/article/list'])
      });
    }
  }

  onChange($event: DropdownChangeEvent) {
    this.selectedCategorieId = +$event.value;
    this.frmArticle.patchValue({categorie_id: this.selectedCategorieId});
  }

  onChangePays($event: DropdownChangeEvent) {

    this.selectedPaysCode =  $event.value;
    this.frmArticle.patchValue({pays_code:this.selectedPaysCode});

  }
  onChangeCompetition($event: DropdownChangeEvent) {

    this.selectedCompetitionId = +$event.value;
    this.frmArticle.patchValue({competition_id: this.selectedCompetitionId});

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
    if (isPlatformBrowser(this.platformId)){
       return this.articleService.getCompetitions()
      .subscribe({
        next:(data) =>{
          const tempData=data as unknown as Competition;
          this.competitions=tempData["data"] as unknown as CompetitionDetail[];
          return this.competitions;
        }
      });
    }
    return null

  }
  private getCategories(){
    if (isPlatformBrowser(this.platformId)){
      return this.articleService.getCategories()
      .subscribe({
        next:(data) =>{
          const tempData=data as unknown as Categorie;
          this.categories=tempData["data"] as unknown as CategorieDetail[];
          return this.categories;
        }
      });
    }
    return null

  }
  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();

    this.getCategories();
    this.getCountries();
    this.getCompetition();

    if(!this.isAddMode && isPlatformBrowser(this.platformId)){
          this.title="mise à jour d'article";
          this.erreur="";
          this.articleService.show(this.id)
            .pipe(first())
            .subscribe({
              next:data=>{
                const resData=data["data"] as ArticleDetail
                const hashtags=this.hashtagExtractorService.extractHashtags(resData.motclef);
                const motscles=this.hashtagExtractorService.removeHashtags(resData.motclef);
                //console.log(`motscles: ${motscles}`);
                resData.date_parution=new Date(this.datePipe.transform(resData.date_parution,'yyyy-MM-ddTHH:mm:ss') || '');
                resData.motclef=motscles.substring(0,motscles.length-1).replace(/, /g,',');
                this.frmArticle.patchValue(
                  {
                    competition_id:resData.competition_id,
                    categorie_id:resData.categorie.id,
                    hashtag:hashtags.trim(),
                    //motclef:motscles.substring(0,motscles.length-1).replace(/, /g,','),
                    //competition_id:resData.categorie.competitions[0].id,

                  }
                );

                this.frmArticle.patchValue(resData);
                //console.log(`resData: ${resData}`);
                 //console.log(`resData: ${this.datePipe.transform(resData.date_parution,'dd/MM/yyyy HH:mm:ss')}`);

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
