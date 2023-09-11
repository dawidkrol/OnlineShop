import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public service: ContactService, public authService: AuthService)
  {
    service.loadContactInfo();
  }

  ngOnInit(): void {
  }

}
