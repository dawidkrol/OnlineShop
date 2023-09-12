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
          this.loading = false;
          var img = {} as ImageModel;
          img.imageUri = downloadURL;
          this.item.images.push(img);
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

    console.log(this.item.images);
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
}
