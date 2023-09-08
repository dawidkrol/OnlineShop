import { Component, Inject, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { CommonModule } from '@angular/common';
import { EmailModel } from '../../classes/EmailModel';

@Component({
  selector: 'app-shopitems-viewone',
  templateUrl: './shopitems-viewone.component.html',
})

export class ShopitemsViewOneComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;
  public email: EmailModel = {} as EmailModel;

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

  sendEmail() {
    this.email.productUri = this.baseUrl + '/shopitems-viewone?itemsToViewId=' + this.item.id;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      });
    const body = JSON.stringify(this.email);
    console.log(body);
    this.http.post(this.baseUrl + 'email', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.email = {} as EmailModel;
      }
    );
  }

}
