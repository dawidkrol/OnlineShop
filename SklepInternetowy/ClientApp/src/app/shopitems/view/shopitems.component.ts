import { Component } from '@angular/core';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { Router } from '@angular/router';
import { CategoryModel } from '../../classes/CategoryModel';
import { AuthService } from '../../shared/services/auth.service';
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';
import { CategorysectionService } from '../../shared/services/categorysection.service';
import { MatCarousel, MatCarouselComponent } from '@thouet/material-carousel';
import { ImageModel } from '../../classes/ImageModel';

@Component({
  selector: 'app-shopitems',
  templateUrl: './shopitems.component.html',
  styleUrls: ['./shopitems.component.css']
})
export class ShopitemsComponent {
  public shopitems: ShopItemsModel[] = [];
  public categories: CategoryModel[] = [];
  public filterCategoryId: string = "";
  public loadingItems = false;
  public loadingCategory = false;
  public loadingFiltering = false;

  constructor(private router: Router, public authService: AuthService, private service: ShopitemssectionService, private categoryService: CategorysectionService) {
    this.getItems();
    this.getCategories();
  }

  sort(table: ImageModel[]) {
    return table.sort((a, b) => b.orderNumber - a.orderNumber);
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

  sortType_default: number = 0;

  sortValues(sortType: number = null) {
    if (sortType != null) {
      this.sortType_default = sortType;
    }
    if (this.sortType_default == 0) {
      this.sortValuesByDateAsc();
    }
    else if (this.sortType_default == 1) {
      this.sortValuesByDateDesc();
    }
    else if (this.sortType_default == 2) {
      this.sortValuesByNameAsc();
    }
    else if (this.sortType_default == 3) {
      this.sortValuesByNameDesc();
    }
  }

  sortValuesByDateAsc() {
    this.shopitems.sort((a, b) => new Date(b.lastUpdateDate).getTime() - new Date(a.lastUpdateDate).getTime());
  }
  sortValuesByDateDesc() {
    this.shopitems.sort((a, b) => new Date(a.lastUpdateDate).getTime() - new Date(b.lastUpdateDate).getTime());
  }
  sortValuesByNameAsc() {
    this.shopitems.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortValuesByNameDesc() {
    this.shopitems.sort((a, b) => b.name.localeCompare(a.name));
  }

  getItems() {
    this.loadingItems = true;
    this.service.get().subscribe(result => {
      this.shopitems = result;
      this.loadingItems = false;
      this.sortValues();
    }, error => {
      console.error(error);
      this.loadingItems = false;
    });
  }

  getCategories() {
    this.loadingCategory = true;
    this.categoryService.loadCategories().subscribe(result => {
      this.categories = result;
      this.loadingCategory = false;
    }, error => {
      console.error(error);
      this.loadingCategory = false;
    });
  }

  filter() {
    this.loadingFiltering = true;
    this.service.get().subscribe(result => {
      this.shopitems = result;
      if (this.filterCategoryId != "") {
        this.shopitems = this.shopitems.filter(x => x.category.map(x => x.id).includes(this.filterCategoryId));
      }
      this.loadingFiltering = false;
      this.sortValues();
    }, error => {
      console.error(error);
      this.loadingFiltering = false;
    });
  }
}
