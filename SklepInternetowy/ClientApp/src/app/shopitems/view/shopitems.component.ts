import { Component } from '@angular/core';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { Router } from '@angular/router';
import { CategoryModel } from '../../classes/CategoryModel';
import { AuthService } from '../../shared/services/auth.service';
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';
import { CategorysectionService } from '../../shared/services/categorysection.service';

@Component({
  selector: 'app-shopitems',
  templateUrl: './shopitems.component.html'
})
export class ShopitemsComponent {
  public shopitems: ShopItemsModel[] = [];
  public categories: CategoryModel[] = [];
  public filterCategoryId: string = "";

  constructor(private router: Router, public authService: AuthService, private service: ShopitemssectionService, private categoryService: CategorysectionService) {

    this.getItems();
    this.getCategories();
  }

  goToAdd() {
    this.router.navigate(['/shopitems-add']);
  }

  goToEdit(par: string) {
    this.router.navigate(['/shopitems-edit'], { queryParams: { itemsToEditId: par } });
  }

  goToDelete(par: string) {
    this.router.navigate(['/shopitems-delete'], { queryParams: { itemsToDeleteId: par } });
  }

  goToView(par: string) {
    this.router.navigate(['/shopitems-viewone'], { queryParams: { itemsToViewId: par } });
  }

  getItems() {
    this.service.get().subscribe(result => {
      this.shopitems = result;
    }, error => console.error(error));
  }

  getCategories() {
    this.categoryService.loadCategories().subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  filter() {
    this.service.get().subscribe(result => {
      this.shopitems = result;
      if (this.filterCategoryId != "") {
        this.shopitems = this.shopitems.filter(x => x.category.map(x => x.id).includes(this.filterCategoryId));
      }
    }, error => console.error(error));
  }
}
