import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopitems',
  templateUrl: './shopitems.component.html'
})
export class ShopitemsComponent {
  public shopitems: ShopItemsModel[] = [];
  _router: Router = {} as Router;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, router: Router) {

    this._router = router;

    http.get<ShopItemsModel[]>(baseUrl + 'shopitems').subscribe(result => {
      this.shopitems = result;
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

}
