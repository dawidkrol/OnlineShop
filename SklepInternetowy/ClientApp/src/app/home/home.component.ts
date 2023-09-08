import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public articles: ArticleModel[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService) {
    this.loadArticles();
  }

  loadArticles() {
    this.http.get<ArticleModel[]>(this.baseUrl + 'articles').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }
}
