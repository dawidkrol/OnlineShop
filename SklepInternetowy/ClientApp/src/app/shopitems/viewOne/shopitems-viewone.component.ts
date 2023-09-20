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
  public folded: boolean = true;

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
        Swal.fire("Email", "Nie udało się wysłać emaila. Sprawdź czy dane są prawidłowe.", "error");
      },
      () => {
        Swal.fire("Email", "Wiadomość email została pomyślnie wysłana, wkrótce otrzymasz odpowiedź.", "success");
        this.email = {} as EmailModel;
      }
    );
    this.folded = true;
  }

  open() {
    this.folded = false;
  }

  close() {
    this.folded = true;
  }

}
