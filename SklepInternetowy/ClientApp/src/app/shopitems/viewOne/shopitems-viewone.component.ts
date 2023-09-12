import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { EmailModel } from '../../classes/EmailModel';
import Swal from 'sweetalert2';
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';

@Component({
  selector: 'app-shopitems-viewone',
  templateUrl: './shopitems-viewone.component.html',
})

export class ShopitemsViewOneComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;
  public email: EmailModel = {} as EmailModel;

  constructor(private route: ActivatedRoute, private service: ShopitemssectionService) {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToViewId'];
      });

    this.service.getItemById(this._id).subscribe(result => {
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
    this.service.sendEmail(this.email,this.item.id).subscribe(
      res => console.log('HTTP response', res),
      err => {
        console.log('HTTP Error', err);
        Swal.fire("Email", "Failed to send the email, please check if the data is correct.", "error");
      },
      () => {
        Swal.fire("Email", "The email has been successfully sent, you will receive a response shortly.", "success");
        this.email = {} as EmailModel;
      }
    );
  }

}
