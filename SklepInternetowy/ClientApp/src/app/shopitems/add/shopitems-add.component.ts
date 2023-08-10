import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { CategoryModel } from '../../classes/CategoryModel'
import { ImageModel } from '../../classes/ImageModel'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-shopitems-add',
  templateUrl: './shopitems-add.component.html',
})
export class ShopitemsAddComponent  {
  public newItem = {} as ShopItemsModel;
  public selectedCategory: string = "";
  public categories: CategoryModel[] = [];
  loading: boolean = false;
  file: File = {} as File;
  imageModels: ImageModel[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fileUploadService: FileUploadService) {

    http.get<CategoryModel[]>(baseUrl + 'categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));

  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.newItem.category.name);
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          this.loading = false;
          var img = {} as ImageModel;
          img.imageUri = event.link;
          this.imageModels.push(img);
        }
      }
    );
  }
}
