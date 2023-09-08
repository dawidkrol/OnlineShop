import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ContactItemTemplateClass } from '../classes/ContactItemTemplateClass';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactinfos: ContactItemTemplateClass[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, public authService: AuthService)
  {
    this.loadContactInfo();
  }

  ngOnInit(): void {
  }

  loadContactInfo() {
    this.http.get<ContactItemTemplateClass[]>(this.baseUrl + 'contact').subscribe(result => {
      this.contactinfos = result;
    }, error => console.error(error));
  }

}
