import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryModel } from '../../classes/CategoryModel';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  public categories: CategoryModel[] = [];
  public newCategory: CategoryModel = {} as CategoryModel;

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

    this.http.delete(this.baseUrl + 'categories', { params: httpParams, headers: headers }).subscribe(
      res => {
      },
      err => {
        Swal.fire("ERROR", "This category cannot be deleted due to existing products assigned to it.", "error");
      },
      () => {
        this.loadCategories();
      });

  }

  loadCategories() {
    this.http.get<CategoryModel[]>(this.baseUrl + 'categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
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
    this.http.put(this.baseUrl + 'categories', body, { headers: headers }).subscribe(
      () => console.log('HTTP request completed.')
    );
  }

  add() {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(this.newCategory);
    console.log(body);
    this.http.post(this.baseUrl + 'categories', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadCategories();
      }
    );
  }
}
