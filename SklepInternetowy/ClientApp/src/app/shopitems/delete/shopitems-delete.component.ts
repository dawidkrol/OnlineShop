import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'

@Component({
  selector: 'app-shopitems-delete',
  templateUrl: './shopitems-delete.component.html'
})
export class ShopitemsDeleteComponent {
  public _id: string = '';

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToDeleteId'];
      });

    let httpParams = new HttpParams().set('id', this._id);

    let options = { params: httpParams };

    http.delete(baseUrl + 'shopitems', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }
}
