import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactModel } from '../classes/ContactModel';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactinfo: ContactModel = {} as ContactModel;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
  {
    this.loadContactInfo();
  }

  ngOnInit(): void {
  }

  loadContactInfo() {
    this.http.get<ContactModel>(this.baseUrl + 'contact').subscribe(result => {
      this.contactinfo = result;
    }, error => console.error(error));
  }

}
