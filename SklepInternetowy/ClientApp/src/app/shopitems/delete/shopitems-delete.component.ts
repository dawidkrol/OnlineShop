import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { AuthService } from '../../shared/services/auth.service';
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';

@Component({
  selector: 'app-shopitems-delete',
  templateUrl: './shopitems-delete.component.html'
})
export class ShopitemsDeleteComponent {
  public _id: string = '';
  public shopItem: ShopItemsModel = {} as ShopItemsModel;

  constructor(private route: ActivatedRoute, private router: Router, public service: ShopitemssectionService) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToDeleteId'];
      });

    service.getItemById(this._id).subscribe(result => {
      this.shopItem = result;
    }, error => console.error(error));
  }

  onDelete() { this.service.delete(this._id).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));

    this.router.navigate(['']);
  }
}
