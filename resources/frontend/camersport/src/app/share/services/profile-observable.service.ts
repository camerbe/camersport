import { Injectable } from '@angular/core';
import {UserLogin} from "../models/login.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileObservableService {
  profile!:UserLogin;

  subjectProfile:BehaviorSubject<UserLogin>=new BehaviorSubject<UserLogin>(
    {
      id:0,
      nom:'',
      prenom:'',
      email:'',
      email_verified_at:new Date(),
      password_changed_at:new Date(),
      role:'',
      created_at:new Date(),
      updated_at:new Date()
    }
  );
  emitProfileObs(){
    return this.subjectProfile.next(this.profile);
  }
  setProfileObs(profile:UserLogin){
    this.profile=profile;
    this.emitProfileObs();
  }

}
