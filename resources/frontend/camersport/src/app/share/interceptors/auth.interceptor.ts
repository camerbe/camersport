import { HttpInterceptorFn } from '@angular/common/http';
import {inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token
  let authReq

  const platformId = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformId)){
    token=localStorage.getItem('token');
  }
  if(req.body instanceof FormData){
    //console.log(`Body : ${req.body}`)
    authReq= req.clone({
      setHeaders:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers':'*',
        'enctype':'multipart/form-data',
        //'Content-Type': 'multipart/form-data',
        'Accept':'*/*',
        'mode': 'no-cors',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  else {
    //console.log(`Body else : ${req.body}`)
    authReq= req.clone({
      setHeaders:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers':'*',
        'Content-Type':'application/json',
        'Accept':'*/*',
        'mode': 'no-cors',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  return next(authReq);
};
