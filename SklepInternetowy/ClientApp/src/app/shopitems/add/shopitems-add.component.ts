import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { CategoryModel } from '../../classes/CategoryModel'
import { ImageModel } from '../../classes/ImageModel'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ShopitemssectionService } from '../../shared/services/shopitemssection.service';
import { CategorysectionService } from '../../shared/services/categorysection.service';

@Component({
  selector: 'app-shopitems-add',
  templateUrl: './shopitems-add.component.html',
})
export class ShopitemsAddComponent  {
  public newItem = {} as ShopItemsModel;
  public selectedCategories: string[] = [];
  public categories: CategoryModel[] = [];
  loading: boolean = false;
  file: File = {} as File;
  imageModels: ImageModel[] = [];

  constructor(public service: ShopitemssectionService, private router: Router, private categoryService: CategorysectionService) {
    this.categoryService.loadCategories().subscribe(result => {
      this.categories = result;
      this.sort();
    }, error => console.error(error));
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);

    const storage = getStorage();
    const storageRef = ref(storage, this.newItem.name + '/' + this.file.name);

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
          this.loading = false;
          let lastNumber = 0;
          if (this.imageModels.length > 0) {
            this.sort();
            lastNumber = this.imageModels[0].orderNumber + 1;
          }
          var img = {} as ImageModel;
          img.imageUri = downloadURL;
          img.orderNumber = lastNumber;
          this.imageModels.push(img);
          this.sort();
        });
      }
    );
  }

  onAddItem() {
    this.newItem.categoryIds = [];
    this.newItem.categoryIds = this.selectedCategories;
    this.newItem.images = this.imageModels;
    this.service.addItem(this.newItem).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.newItem = {} as ShopItemsModel;
      }
    );

    this.router.navigate(['']);
  }

  onDeleteImg(url: string | undefined) {
    const storage = getStorage();
    const rr = ref(storage, url);
    deleteObject(rr);

    this.imageModels = this.imageModels.filter(x => x.imageUri !== url);
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
  }

  orderDown(orderNumber: number) {
    let actual = this.imageModels.find(x => x.orderNumber == orderNumber);
    let prev = this.imageModels.find(x => x.orderNumber == (actual.orderNumber - 1));
    prev.orderNumber += 1;
    actual.orderNumber -= 1;
    this.sort();
  }

  orderUp(orderNumber: number) {
    let actual = this.imageModels.find(x => x.orderNumber == orderNumber);
    let next = this.imageModels.find(x => x.orderNumber == (actual.orderNumber + 1));
    next.orderNumber -= 1;
    actual.orderNumber += 1;
    this.sort();
  }

  sort() {
    this.imageModels = this.imageModels.sort((a, b) => b.orderNumber - a.orderNumber);
  }

  checkNumbers() {
    for (let i = 0; i < this.imageModels.length; i += 1) {
      this.imageModels[this.imageModels.length - 1 - i].orderNumber = i;
    }
  }
}
