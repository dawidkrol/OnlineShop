import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public articles: ArticleModel[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get<ArticleModel[]>(this.baseUrl + 'articles').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }
}
