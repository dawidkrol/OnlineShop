import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactModel } from '../classes/ContactModel';

@Component({
  selector: 'app-contactinfo.management',
  templateUrl: './contactinfo.management.component.html',
  styleUrls: ['./contactinfo.management.component.css']
})
export class ContactinfoManagementComponent implements OnInit {

  public contactinfo: ContactModel = {} as ContactModel;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadContactInfo();
  }

  ngOnInit(): void {
  }

  loadContactInfo() {
    this.http.get<ContactModel>(this.baseUrl + 'contact').subscribe(result => {
      this.contactinfo = result;
    }, error => console.error(error));
  }

  update() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.contactinfo);
    console.log(body);
    this.http.put(this.baseUrl + 'contact', body, { headers: headers }).subscribe(
      () => {
        console.log('HTTP request completed.');
        this.loadContactInfo();
      }
    );
  }

}
