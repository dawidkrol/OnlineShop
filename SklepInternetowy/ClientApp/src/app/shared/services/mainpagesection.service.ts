import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ArticleModel } from '../../classes/ArticleModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainpagesectionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService) { }

  loadArticles() {
    return this.http.get<ArticleModel[]>(this.baseUrl + 'articles');
  }

  delete(id: any) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });

    let httpParams = new HttpParams().set('id', id).set('observe', 'response');

    return this.http.delete(this.baseUrl + 'articles', { params: httpParams, headers: headers });
  }

  update(model: ArticleModel) {
    var token = this.authService.getToken;
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    const body = JSON.stringify(model);
    console.log(body);
    return this.http.put(this.baseUrl + 'articles', body, { headers: headers });
  }

  add(model: ArticleModel) {
    var token = this.authService.getToken;
    var headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(model);
    console.log(body);
    return this.http.post(this.baseUrl + 'articles', body, { headers: headers });
  }
}
