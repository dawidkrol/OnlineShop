import { Component, Inject, OnInit } from '@angular/core';
import { ContactinfoManagementService } from './services/contactinfo.management.service';

@Component({
  selector: 'app-contactinfo.management',
  templateUrl: './contactinfo.management.component.html',
  styleUrls: ['./contactinfo.management.component.css']
})
export class ContactinfoManagementComponent implements OnInit {

  constructor(public service: ContactinfoManagementService) {
    service.loadContactInfo();
  }

  ngOnInit(): void { }
}
