import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopitems',
  templateUrl: './shopitems.component.html'
})
export class ShopitemsComponent {
  public shopitems: ShopItemsModel[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<ShopItemsModel[]>(baseUrl + 'shopitems').subscribe(result => {
      this.shopitems = result;
    }, error => console.error(error));
  }
}

interface ShopItemsModel {
  id: string;
  name: string;
  category: CategoryModel;
  description: string;
  price: number;
  quantity: number;
  images: ImageModel[];
  createdDate: Date;
  lastUpdateDate: Date;
}

interface CategoryModel {
  id: string;
  name: string;
}

interface ImageModel {
  id: string;
  imageUri: string;
}

