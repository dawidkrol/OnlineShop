import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopItemsModel } from '../../classes/ShopItemsModel';
import { ImageModel } from '../../classes/ImageModel';
import { CategoryModel } from '../../classes/CategoryModel';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';
import { CategorysectionService } from '../../shared/services/categorysection.service';

@Component({
  selector: 'app-shopitems-edit',
  templateUrl: './shopitems-edit.component.html'
})
export class ShopitemsEditComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;

  public selectedCategories: string[] = [];
  public categories: CategoryModel[] = [];
  loading: boolean = false;
  file: File = {} as File;

  constructor(private route: ActivatedRoute, private router: Router, private service: ShopitemssectionService, private categoryService: CategorysectionService)
  {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToEditId'];
      });

    categoryService.loadCategories().subscribe(result => {
      this.categories = result;
    }, error => console.error(error));

    this.service.getItemById(this._id).subscribe(result => {
      this.item = result;
      this.item.category.forEach(x => this.selectedCategories.push(x.id));
      this.sort();
    }, error => console.error(error));
  }

  onUpdate() {
    this.item.categoryIds = this.selectedCategories;
    this.service.update(this.item).subscribe(
      () => console.log('HTTP request completed.')
    );
    this.router.navigate(['']);
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);

    const storage = getStorage();
    const storageRef = ref(storage, this.item.name + '/' + this.file.name);

    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let lastNumber = 0;
          if (this.item.images.length > 0) {
            this.sort();
            lastNumber = this.item.images[0].orderNumber + 1;
          }
          this.loading = false;
          var img = {} as ImageModel;
          img.imageUri = downloadURL;
          img.orderNumber = lastNumber;
          this.item.images.push(img);
          this.sort();
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  onDeleteImg(url: string | undefined) {
    const storage = getStorage();
    const rr = ref(storage, url);
    deleteObject(rr);

    this.item.images = this.item.images.filter(x => x.imageUri !== url);
    this.checkNumbers();
    this.sort();
  }

  pushCheckBoxValue(event: any, value: any) {
    if (event.target.checked) {
      if (this.selectedCategories.every(x => x != value)) {
        this.selectedCategories.push(value)
      }
    } else {
      this.selectedCategories.forEach((x, i) => {
        if (x == value) {
          this.selectedCategories.splice(i, 1);
        }
      })
    }
    console.log(this.selectedCategories);
  }

  isSelected(id: string): boolean {
    if (this.item?.categoryIds == null || this.item.categoryIds.length == 0) {
      return false;
    }
    return this.item.categoryIds.some(x => x == id);
  }

  orderDown(orderNumber: number) {
    let actual = this.item.images.find(x => x.orderNumber == orderNumber);
    let prev = this.item.images.find(x => x.orderNumber == (actual.orderNumber - 1));
    prev.orderNumber += 1;
    actual.orderNumber -= 1;
    this.sort();
  }

  orderUp(orderNumber: number) {
    console.log(orderNumber);
    let actual = this.item.images.find(x => x.orderNumber == orderNumber);
    let next = this.item.images.find(x => x.orderNumber == (actual.orderNumber + 1));
    console.log(actual);
    console.log(next);
    next.orderNumber -= 1;
    actual.orderNumber += 1;
    this.sort();
  }

  sort() {
    this.item.images = this.item.images.sort((a, b) => b.orderNumber - a.orderNumber);
  }

  checkNumbers() {
    for (let i = 0; i < this.item.images.length; i += 1)
    {
      this.item.images[this.item.images.length - 1 - i].orderNumber = i;
    }
  }
}
