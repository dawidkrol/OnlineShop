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

  getContactInfo(): Observable<ContactItemTemplateClass[]> {
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
    this.http.put(this.baseUrl + 'contact', body, { headers: headers }).subscribe(
      () => {
        console.log('HTTP request completed.');
      }
    );
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
    this.http.post(this.baseUrl + 'contact', body, { headers: headers }).subscribe(
      () => {
        console.log('HTTP request completed.');
      }
    );
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

    this.http.delete(this.baseUrl + 'contact', { params: httpParams, headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
      });
  }
}
