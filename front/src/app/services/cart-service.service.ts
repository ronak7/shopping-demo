import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  options = { headers: {} };

  constructor(private http: HttpClient) { }

  getData(url, data: any = {}) {
    return this.http
      .get<any>(environment.baseURL + url, this.options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deleteData(url, data: any = {}) {
    return this.http
      .delete<any>(environment.baseURL + url, this.options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
