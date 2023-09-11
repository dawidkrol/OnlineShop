import { Inject, Injectable } from '@angular/core';
import { ContactItemTemplateClass } from '../../classes/ContactItemTemplateClass';
import { ContactSectionService } from '../../shared/services/contactSection.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contactinfos: ContactItemTemplateClass[] = [];
  constructor(public service: ContactSectionService)
  {
    this.loadContactInfo();
  }

  loadContactInfo() {
    this.service.getContactInfo().subscribe(data => {
      this.contactinfos = data;
    });
  }
}
