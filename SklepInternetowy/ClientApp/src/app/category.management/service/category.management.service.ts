import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryModel } from '../../classes/CategoryModel';
import { CategorysectionService } from '../../shared/services/categorysection.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {

  public categories: CategoryModel[] = [];
  public newCategory: CategoryModel = {} as CategoryModel;

  constructor(private service: CategorysectionService) { }

  delete(id: any) {
    this.service.delete(id).subscribe(
      res => {
      },
      err => {
        Swal.fire("ERROR", "This category cannot be deleted due to existing products assigned to it.", "error");
      },
      () => {
        this.loadCategories();
      });

  }

  loadCategories() {
    this.service.loadCategories().subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  edit(cat: CategoryModel) {
    this.service.edit(cat).subscribe(
      {
        complete: () => {
          this.loadCategories();
        },
      }
    );
  }

  add() {
    this.service.add(this.newCategory).subscribe({
      complete: () => {
        this.loadCategories();
        this.newCategory = {} as CategoryModel;
      }
    }
    );
  }
}
