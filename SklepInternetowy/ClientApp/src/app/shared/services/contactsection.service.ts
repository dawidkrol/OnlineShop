import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactItemTemplateClass } from '../../classes/ContactItemTemplateClass';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactSectionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService) { }

  getContactInfo() {
    return this.http.get<ContactItemTemplateClass[]>(this.baseUrl + 'contact');
  }

  update(model: ContactItemTemplateClass) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(model);
    console.log(body);
    return this.http.put(this.baseUrl + 'contact', body, { headers: headers });
  }

  add(model: ContactItemTemplateClass) {
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    const body = JSON.stringify(model);
    console.log(body);
    return this.http.post(this.baseUrl + 'contact', body, { headers: headers });
  }

  delete(id: number) {
    let httpParams = new HttpParams().set('id', id).set('observe', 'response');
    var token = this.authService.getToken;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      });

    return this.http.delete(this.baseUrl + 'contact', { params: httpParams, headers: headers })
  }
}
