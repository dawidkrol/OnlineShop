import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel';
import { ImageModel } from '../../classes/ImageModel';
import { CategoryModel } from '../../classes/CategoryModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-shopitems-edit',
  templateUrl: './shopitems-edit.component.html'
})
export class ShopitemsEditComponent {

  public _id: string | undefined;
  public item: ShopItemsModel = {} as ShopItemsModel;

  public selectedCategory: string = "";
  public categories: CategoryModel[] = [];
  loading: boolean = false;
  file: File = {} as File;
  imageModels: ImageModel[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router)
  {
    this.route
      .queryParams
      .subscribe(params => {
        this._id = params['itemsToEditId'];
      });

    this.http.get<ShopItemsModel>(baseUrl + 'shopitems/getById/' + this._id).subscribe(result => {
      this.item = result;
    }, error => console.error(error));


    http.get<CategoryModel[]>(baseUrl + 'categories').subscribe(result => {
      this.categories = result;
      console.log(result.length);
    }, error => console.error(error));
  }

  onUpdate() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.item);
    console.log(body);
    console.log(headers);
    console.log(this.baseUrl + 'shopitems');
    this.http.put(this.baseUrl + 'shopitems', body, { headers: headers }).subscribe(
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
          this.imageModels.push(img);
          this.item.images.push(img);
          console.log('File available at', downloadURL);
        });
      }
    );
    this.router.navigate(['']);
  }
}
