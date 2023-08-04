import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'

@Component({
  selector: 'app-shopitems-edit',
  templateUrl: './shopitems-edit.component.html'
})
export class ShopitemsEditComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToEditId'];
      });

    http.get<ShopItemsModel>(baseUrl + 'shopitems/getById/' + this._id).subscribe(result => {
      this.item = result;
    }, error => console.error(error));
  }
}
