import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
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
    this.service.getContactInfo().subscribe(
      result => {
        this.contactinfos = result;
      });
  }

  update(model: ContactItemTemplateClass) {
    this.service.update(model).subscribe({
      complete: () => {
        this.loadContactInfo();
      },
    }
    );
  }

  add() {
    this.service.add(this.newContactInfo).subscribe(
      {
        complete: () => {
          this.loadContactInfo();
          this.newContactInfo = {} as ContactItemTemplateClass;
        },
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadContactInfo();
      });
  }
}
