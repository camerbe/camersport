import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('token');
  const autReq = req.clone({
    setHeaders:{
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers':'*',
      'Content-Type':'application/json',
      'Accept':'*/*',
      'mode': 'no-cors',
      'Authorization':`Bearer ${token}`
    }
  });
  return next(autReq);
};
