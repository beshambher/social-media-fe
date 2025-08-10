import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  /** GET single response from the server */
  get<T>(url: string): Observable<any> {
    return this.http.get<T>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /** GET list response from the server */
  getList<T>(url: string): Observable<any> {
    return this.http.get<T>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /** POST a resource to the server */
  post<T>(url: string, data: any): Observable<any> {
    return this.http.post<T>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /** PUT a resource on the server */
  put<T>(url: string, data: any): Observable<any> {
    return this.http.put<T>(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /** DELETE a resource from the server */
  delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
}
