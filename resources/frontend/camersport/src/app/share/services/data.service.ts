import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {

  constructor(
    protected httpClient:HttpClient,
    @Inject(String) private url:string
  ) { }

  getAll():Observable<T[]>{
    return this.httpClient.get<T[]>(this.url)
      .pipe(catchError(this.handleError));
  }
  show(id:number):Observable<T>{
    return this.httpClient.get<T>(this.url+`/${id}`)
      .pipe(catchError(this.handleError));
  }
  delete(id:number):Observable<T>{
    return this.httpClient.delete<T>(this.url+`/${id}`)
      .pipe(catchError(this.handleError));
  }
  create(resource:T):Observable<T>{
    return this.httpClient.post<T>(this.url,JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }
  update(id:number,resource:any):Observable<T>{
    return  this.httpClient.put<T>(this.url+`/${id}`,JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `${error.error.message}`;
    }
    else {
      // Backend error
      errorMessage = `${error.error}`;
    }
    return throwError(() => new Error(JSON.stringify("Quelque chose d'horrible est arrivé; Veuillez réessayer plus tard.")));
  }

}
