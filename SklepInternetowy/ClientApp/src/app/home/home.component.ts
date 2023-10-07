import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';
import { AuthService } from '../shared/services/auth.service';
import { MainpagesectionService } from '../shared/services/mainpagesection.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public articles: ArticleModel[] = [];

  constructor(public service: MainpagesectionService, public authService: AuthService, private sanitizer: DomSanitizer) {
    this.loadArticles();
  }

  loadArticles() {
    this.service.loadArticles().subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

  safeHTML(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
