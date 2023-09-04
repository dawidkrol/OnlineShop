import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from '../classes/CategoryModel';

@Component({
  selector: 'app-category.management',
  templateUrl: './category.management.component.html',
  styleUrls: ['./category.management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  public categories: CategoryModel[] = [];
  public newCategory: CategoryModel = {} as CategoryModel;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
  {
    this.loadCategories();
  }

  ngOnInit(): void {
  }

  delete(id: any) {
    let httpParams = new HttpParams().set('id', id);

    let options = { params: httpParams };

    this.http.delete(this.baseUrl + 'categories', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadCategories();
      });

  }

  loadCategories() {
    this.http.get<CategoryModel[]>(this.baseUrl + 'categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  edit(cat: CategoryModel) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(cat);
    console.log(body);
    this.http.put(this.baseUrl + 'categories', body, { headers: headers }).subscribe(
      () => console.log('HTTP request completed.')
    );
  }

  add() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.newCategory);
    console.log(body);
    this.http.post(this.baseUrl + 'categories', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadCategories()
      }
    );
  }

}
