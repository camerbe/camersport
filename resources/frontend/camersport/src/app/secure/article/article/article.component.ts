import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../share/environments/environment";
import {Categorie} from "../../../share/models/categorie";
import {Competition} from "../../../share/models/competition";
import {ArticleService} from "../../../share/services/article/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  frmGroupArticle!: FormGroup;
  label: string='Ajouter';
  categories:Categorie[]=[];
  competitions:Competition[]=[];
  // @ts-ignore
  // @ts-ignore
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
      var cmsURL = `${environment.baseUrl}api/laravel-filemanager?editor=${meta.fieldname}`;

      if (meta.filetype == 'image') {

        cmsURL = cmsURL + "&type=Images";
        console.log(`cmsURL: ${cmsURL}`);
      }
      else {
        cmsURL = cmsURL + "&type=Files";
        console.log(`cmsURL: ${cmsURL}`);
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
          //callback(message.content);

        }

      });
    },
    plugins: [
      'image', 'media', 'tools', 'link', 'advlist',
      'autolink', 'lists', 'table', 'wordcount','code'
    ],
    toolbar:'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table mergetags  blockquote'

  };
  constructor(
    private fb:FormBuilder,
    private articleService:ArticleService
  ) {
      this.frmGroupArticle=this.fb.group({
        source:['',[Validators.required]],
        auteur:['',[Validators.required]],
        titre:['',[Validators.required,Validators.maxLength(100)]],
        motclef:['',[Validators.required]],
        date_parution:['',[Validators.required]],
        article:['',[Validators.required]],
        categorie_id:['0',[Validators.required]],
        competition_id:['0',[Validators.required]],
        image:['0',[Validators.required]],
      })
  }

  get source(){
    return this.frmGroupArticle.get('source');
  }
  get auteur(){
    return this.frmGroupArticle.get('auteur');
  }
  get titre(){
    return this.frmGroupArticle.get('titre');
  }
  get motclef(){
    return this.frmGroupArticle.get('motclef');
  }
  get date_parution(){
    return this.frmGroupArticle.get('date_parution');
  }
  get article(){
    return this.frmGroupArticle.get('article');
  }
  get categorie_id(){
    return this.frmGroupArticle.get('categorie_id');
  }
  get competition_id(){
    return this.frmGroupArticle.get('competition_id');
  }
  get image(){
    return this.frmGroupArticle.get('image');
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCompetitions();
  }

  private getAllCategories() {
    return this.articleService.getCategories().subscribe({
      next:(res)=>{
        // @ts-ignore
        this.categories=res['data'];
        //console.log(this.categories)
      }
    })
  }

  private getAllCompetitions() {
    return this.articleService.getCompetitions().subscribe({
      next:(res)=>{
        // @ts-ignore
        this.competitions=res['data']
        //res
      }
    });
  }


  onCategorieChange($event: Event) {
    const target = $event.target as HTMLButtonElement;
    this.frmGroupArticle.patchValue({categorie_id:+target.value})
    //console.log(this.frmGroupArticle.value)
  }

  onCompetitionChange($event: Event) {
    const target = $event.target as HTMLButtonElement;
    this.frmGroupArticle.patchValue({competition_id:+target.value})
    //console.log(this.frmGroupArticle.value)
  }
}
