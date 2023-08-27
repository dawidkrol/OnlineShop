import { Component, Inject, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopitems-viewone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopitems-viewone.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  slickInit(e:any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
