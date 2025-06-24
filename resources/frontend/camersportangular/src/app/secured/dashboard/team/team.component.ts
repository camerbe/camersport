import { AfterViewInit, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ExpiredAtService } from '../../../services/expired-at.service';
import { TeamService } from '../../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDetail } from '../../../core/models/team-detail';
import { environment } from '../../../../environments/environment.development';
import { first } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit,AfterViewInit {

  // fb:FormBuilder=inject(FormBuilder);
  // authSevice:AuthService=inject(AuthService);
  // expiredAtService:ExpiredAtService=inject(ExpiredAtService);
  // teamService:TeamService=inject(TeamService);
  // router:Router=inject(Router);
  // activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  title:string="ajout d'équipe";
  link:string="/secured/dashboard/team/list";
  label:string="Liste";
  isExpired!:boolean;
  frmTeam!:FormGroup;
  id!:number;
  isAddMode!:boolean;
  erreur!:string;
  team!:TeamDetail;

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
    private teamService: TeamService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.frmTeam=this.fb.group({
      name:['',Validators.required],
      logo:['',Validators.required],

    });

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
          this.title="mise à jour de Team";

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
  async ngAfterViewInit(): Promise<void> {
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
}
