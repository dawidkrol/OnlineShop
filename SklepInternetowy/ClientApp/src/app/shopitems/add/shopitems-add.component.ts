import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fileUploadService: FileUploadService) {

    http.get<CategoryModel[]>(baseUrl + 'categories').subscribe(result => {
      this.categories = result;
    }, error => console.error(error));

  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.newItem.categoryId);
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

  onAddItem() {

    var categ = this.categories[this.categories.findIndex(x => x.id === this.selectedCategory)];
    this.newItem.categoryId = categ.id;
    this.newItem.images = this.imageModels;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.newItem);
    console.log(body);
    console.log(headers);
    console.log(this.baseUrl + 'shopitems');
    this.http.post(this.baseUrl + 'shopitems', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
  }
}
