import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { Router } from '@angular/router';
import { CategoryModel } from '../../classes/CategoryModel';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-shopitems',
  templateUrl: './shopitems.component.html'
})
export class ShopitemsComponent {
  public shopitems: ShopItemsModel[] = [];
  public categories: CategoryModel[] = [];
  _router: Router = {} as Router;
  public filterCategoryId: string = "";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, router: Router, public authService: AuthService) {

    this._router = router;

    http.get<ShopItemsModel[]>(baseUrl + 'shopitems').subscribe(result => {
      this.shopitems = result;
    }, error => console.error(error));

    http.get<CategoryModel[]>(baseUrl + 'categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  goToAdd() {
    this._router.navigate(['/shopitems-add']);
  }

  goToEdit(par: string) {
    this._router.navigate(['/shopitems-edit'], { queryParams: { itemsToEditId: par } });
  }

  goToDelete(par: string) {
    this._router.navigate(['/shopitems-delete'], { queryParams: { itemsToDeleteId: par } });
  }

  goToView(par: string) {
    this._router.navigate(['/shopitems-viewone'], { queryParams: { itemsToViewId: par } });
  }

  filter() {
      this.http.get<ShopItemsModel[]>(this.baseUrl + 'shopitems').subscribe(result => {
        this.shopitems = result;
        if (this.filterCategoryId != "") {
          this.shopitems = this.shopitems.filter(x => x.category.map(x => x.id).includes(this.filterCategoryId));
        }
      }, error => console.error(error));
  }

}
