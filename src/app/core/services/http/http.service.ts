import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600'
    }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  /**
   * Helper method to convert a plain object into HttpParams.
   * This makes it easier for components to pass query parameters as simple objects.
   */
  private buildHttpParams(params?: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    return httpParams;
  }

  /** GET single response from the server */
  get<T>(url: string, queryParams?: { [key: string]: any }): Observable<any> {
    const options = {
      ...this.httpOptions,
      params: this.buildHttpParams(queryParams)
    };
    return this.http.get<T>(url, options)
      .pipe(
        catchError(this.handleError<T>())
      );
  }

  /** GET list response from the server */
  getList<T>(url: string, queryParams?: { [key: string]: any }): Observable<any> {
    const options = {
      ...this.httpOptions,
      params: this.buildHttpParams(queryParams)
    };
    return this.http.get<T>(url, options)
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
