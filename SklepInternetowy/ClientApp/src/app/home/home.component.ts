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
  public loading = false;

  constructor(public service: MainpagesectionService, public authService: AuthService, private sanitizer: DomSanitizer) {
    this.loadArticles();
  }


  loadArticles() {
    this.loading = true;
    this.service.loadArticles().subscribe(result => {
      this.articles = result;
      this.loading = false;
    },
      error =>
    {
      console.error(error);
      this.loading = false;
    });
  }

  safeHTML(str: string) {
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }
}
