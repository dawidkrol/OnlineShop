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
        Swal.fire("BŁĄD", "Tej kategorii nie można usunąć ze względu na przypisane do niej istniejące produkty.", "error");
      },
      () => {
        this.loadCategories();
      });

  }

  loadCategories() {
    this.service.loadCategories().subscribe(result => {
      this.categories = result;
      this.sort();
      console.log(result);
    });
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

  setorder(categories: CategoryModel[]) {
    this.service.setorder(categories).subscribe(
      {
        complete: () => {
          this.loadCategories();
        },
      }
    );
  }

  orderUp(category: CategoryModel) {
    this.categories.find(x => x.orderNumber == (category.orderNumber - 1)).orderNumber += 1;
    this.categories.find(x => x.id == category.id).orderNumber -= 1;
    this.sort();
  }

  orderDown(category: CategoryModel) {
    this.categories.find(x => x.orderNumber == (category.orderNumber + 1)).orderNumber -= 1;
    this.categories.find(x => x.id == category.id).orderNumber += 1;
    this.sort();
  }

  sort() {
    this.categories = this.categories.sort((a, b) => a.orderNumber - b.orderNumber);
  }

  saveOrder() {
    this.service.setorder(this.categories).subscribe(
      {
        complete: () => {
          this.loadCategories();
        },
      }
    );
  }
}
