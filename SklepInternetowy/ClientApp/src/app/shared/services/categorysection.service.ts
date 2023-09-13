import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CategoryModel } from '../../classes/CategoryModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategorysectionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService) { }

  delete(id: any) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    let httpParams = new HttpParams().set('id', id);

    return this.http.delete(this.baseUrl + 'categories', { params: httpParams, headers: headers });

  }

  loadCategories() {
    return this.http.get<CategoryModel[]>(this.baseUrl + 'categories');
  }

  edit(cat: CategoryModel) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(cat);
    console.log(body);
    return this.http.put(this.baseUrl + 'categories', body, { headers: headers });
  }

  add(newCategory: CategoryModel) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(newCategory);
    console.log(body);
    return this.http.post(this.baseUrl + 'categories', body, { headers: headers });
  }
}
