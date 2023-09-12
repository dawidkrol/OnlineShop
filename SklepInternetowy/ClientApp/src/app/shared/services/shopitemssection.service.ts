import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EmailModel } from '../../classes/EmailModel';
import { ShopItemsModel } from '../../classes/ShopItemsModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopitemssectionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService) { }

  addItem(newItem: ShopItemsModel) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(newItem);
    console.log(body);
    return this.http.post(this.baseUrl + 'shopitems', body, { headers: headers });
  }

  getItemById(id: string) {
    return this.http.get<ShopItemsModel>(this.baseUrl + 'shopitems/getById/' + id);
  }

  delete(id: string) {
    let httpParams = new HttpParams().set('id', id);
    let token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });

    return this.http.delete(this.baseUrl + 'shopitems', { params: httpParams, headers: headers });
  }

  update(model: ShopItemsModel) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(model);
    console.log(body);
    return this.http.put(this.baseUrl + 'shopitems', body, { headers: headers });
  }

  sendEmail(email: EmailModel, id: string) {
    email.productUri = this.baseUrl + '/shopitems-viewone?itemsToViewId=' + id;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      });
    const body = JSON.stringify(email);
    console.log(body);
    return this.http.post(this.baseUrl + 'email', body, { headers: headers });
  }

  get() {
    return this.http.get<ShopItemsModel[]>(this.baseUrl + 'shopitems');
  }
}
