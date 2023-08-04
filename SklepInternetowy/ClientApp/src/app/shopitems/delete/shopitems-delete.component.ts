import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'

@Component({
  selector: 'app-shopitems-delete',
  templateUrl: './shopitems-delete.component.html'
})
export class ShopitemsDeleteComponent {
  public _id: string | undefined;

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToDeleteId'];
      });

    console.log('id to delete: ' + this._id);

    //http.delete(baseUrl + 'shopitems/' + this._id).subscribe(result => { }, error => console.error(error));
  }
}
