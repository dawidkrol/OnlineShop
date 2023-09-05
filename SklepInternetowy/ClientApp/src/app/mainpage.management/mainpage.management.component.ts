import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';

@Component({
  selector: 'app-mainpage.management',
  templateUrl: './mainpage.management.component.html',
  styleUrls: ['./mainpage.management.component.css']
})
export class MainpageManagementComponent implements OnInit {

  public articles: ArticleModel[] = [];
  public newArticle: ArticleModel = {} as ArticleModel;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadArticles();
  }

  ngOnInit(): void {
  }

  loadArticles() {
    this.http.get<ArticleModel[]>(this.baseUrl + 'articles').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

  delete(id: any) {
    let httpParams = new HttpParams().set('id', id).set('observe', 'response');

    let options = { params: httpParams };

    this.http.delete(this.baseUrl + 'articles', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadArticles();
      });

  }

  update(model: ArticleModel) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(model);
    console.log(body);
    this.http.put(this.baseUrl + 'articles', body, { headers: headers }).subscribe(
      () => console.log('HTTP request completed.')
    );
  }

  add() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.newArticle);
    console.log(body);
    this.http.post(this.baseUrl + 'articles', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadArticles()
      }
    );
  }


}
