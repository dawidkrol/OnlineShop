import { Component, Inject } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';
import { AuthService } from '../shared/services/auth.service';
import { MainpagesectionService } from '../shared/services/mainpagesection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public articles: ArticleModel[] = [];

  constructor(public service: MainpagesectionService, public authService: AuthService) {
    this.loadArticles();
  }

  loadArticles() {
    this.service.loadArticles().subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }
}
