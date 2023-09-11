import { Injectable } from '@angular/core';
import { ContactItemTemplateClass } from '../../classes/ContactItemTemplateClass';
import { ContactSectionService } from '../../shared/services/contactSection.service';

@Injectable({
  providedIn: 'root'
})
export class ContactinfoManagementService {
  public contactinfos: ContactItemTemplateClass[] = [];
  public newContactInfo: ContactItemTemplateClass = {} as ContactItemTemplateClass;
  constructor(public service: ContactSectionService) { }

  loadContactInfo() {
    this.service.getContactInfo().subscribe(data => {
      this.contactinfos = data;
    });
  }

  update(model: ContactItemTemplateClass) {
    this.service.update(model);
    this.loadContactInfo();
  }

  add() {
    this.service.add(this.newContactInfo);
    this.loadContactInfo();
    this.newContactInfo = {} as ContactItemTemplateClass;
  }

  delete(id: number) {
    this.service.delete(id);
    this.loadContactInfo();
  }
}
