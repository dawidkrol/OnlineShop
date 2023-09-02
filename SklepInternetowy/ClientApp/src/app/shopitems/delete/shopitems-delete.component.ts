import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'

@Component({
  selector: 'app-shopitems-delete',
  templateUrl: './shopitems-delete.component.html'
})
export class ShopitemsDeleteComponent {
  public _id: string = '';
  public shopItem: ShopItemsModel = {} as ShopItemsModel;

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToDeleteId'];
      });

    this.http.get<ShopItemsModel>(baseUrl + 'shopitems/getById/' + this._id).subscribe(result => {
      this.shopItem = result;
    }, error => console.error(error));
  }

  onDelete() {

    let httpParams = new HttpParams().set('id', this._id);

    let options = { params: httpParams };

    this.http.delete(this.baseUrl + 'shopitems', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));

    this.router.navigate(['']);
  }
}
