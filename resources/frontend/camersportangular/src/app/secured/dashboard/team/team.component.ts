import { Component, inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { TeamService } from '../../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDetail } from '../../../core/models/team-detail';
import { environment } from '../../../../environments/environment.development';
import { first } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {

  fb:FormBuilder=inject(FormBuilder);
  authSevice:AuthService=inject(AuthService);
  expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  teamService:TeamService=inject(TeamService);
  router:Router=inject(Router);
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  title:string="ajout d'équipe";
  link:string="/secured/dashboard/team/list";
  label:string="Liste";
  isExpired!:boolean;
  frmTeam!:FormGroup;
  id!:number;
  isAddMode!:boolean;
  erreur!:string;
  team!:TeamDetail;

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

  constructor() {
    this.frmTeam=this.fb.group({
      name:['',Validators.required],
      logo:['',Validators.required],

    })
  }

  get name(){
    return this.frmTeam.get('name');
  }
  get logo(){
    return this.frmTeam.get('logo');
  }
  onSubmit() {
    if(this.isAddMode) {
      this.teamService.create(this.frmTeam.value)
        .subscribe({
          next: () => this.router.navigate(['/secured/dashboard/team/list']),
          error: (error) => console.log(error)
        });
    }
    else{

      this.teamService.patch(this.id,this.frmTeam.value)
      .subscribe({
        next:()=>this.router.navigate(['/secured/dashboard/team/list'])
      });
    }
  }
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.isAddMode=!this.id;
    this.expiredAtService.updateState(this.authSevice.isExpired());
    this.expiredAtService.state$.subscribe(state=>this.isExpired=state);
    if(this.isExpired) this.authSevice.logout();
    if(!this.isAddMode){
          this.title="mise à jour de catégorie";

          this.teamService.show(this.id)
            .pipe(first())
            .subscribe({
              next:data=>{
                const resData=data["data"] as TeamDetail
                this.frmTeam.patchValue(resData);
                //console.log(`${this.frmCategorie.value}`)
              },
              error:err=>this.erreur=err.error
            })

        }

  }
  // getTeam() {
  //   this.teamService.show(this.route.snapshot.params['id']).subscribe({

}
