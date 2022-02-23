import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

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

  postData(url, data: any = {}) {
    return this.http
      .post<any>(environment.baseURL + url, data,this.options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  addImage(url, formdata, id = '')  {
    var postData: FormData = new FormData();

    if (formdata) {
      for (var key in formdata) {
        var value = formdata[key];
        postData.append(key, value);
      }
    }
    return this.http
      .post<any>(environment.baseURL + url, postData, this.options)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  putData(url, data: any = {}) {
    return this.http
      .put<any>(environment.baseURL + url, data, this.options)
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
