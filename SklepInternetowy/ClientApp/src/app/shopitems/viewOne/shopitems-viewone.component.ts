import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'

@Component({
  selector: 'app-shopitems-viewone',
  templateUrl: './shopitems-viewone.component.html'
})
export class ShopitemsViewOneComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToViewId'];
      });

    this.http.get<ShopItemsModel>(baseUrl + 'shopitems/getById/' + this._id).subscribe(result => {
      this.item = result;
    }, error => console.error(error));
  }

}
