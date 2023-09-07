import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactItemTemplateClass } from '../classes/ContactItemTemplateClass';

@Component({
  selector: 'app-contactinfo.management',
  templateUrl: './contactinfo.management.component.html',
  styleUrls: ['./contactinfo.management.component.css']
})
export class ContactinfoManagementComponent implements OnInit {

  public contactinfos: ContactItemTemplateClass[] = [];
  public newContactInfo: ContactItemTemplateClass = {} as ContactItemTemplateClass;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadContactInfo();
  }

  ngOnInit(): void { }

  loadContactInfo() {
    this.http.get<ContactItemTemplateClass[]>(this.baseUrl + 'contact').subscribe(result => {
      this.contactinfos = result;
    }, error => console.error(error));
  }

  update(model: ContactItemTemplateClass) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(model);
    console.log(body);
    this.http.put(this.baseUrl + 'contact', body, { headers: headers }).subscribe(
      () => {
        console.log('HTTP request completed.');
        this.loadContactInfo();
      }
    );
  }

  add() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.newContactInfo);
    console.log(body);
    this.http.post(this.baseUrl + 'contact', body, { headers: headers }).subscribe(
      () => {
        console.log('HTTP request completed.');
        this.loadContactInfo();
        this.newContactInfo = {} as ContactItemTemplateClass;
      }
    );
  }

  delete(id: number) {
    let httpParams = new HttpParams().set('id', id).set('observe', 'response');

    let options = { params: httpParams };

    this.http.delete(this.baseUrl + 'contact', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadContactInfo();
      });
  }
}
