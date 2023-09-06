import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopItemsModel } from '../../classes/ShopItemsModel'
import { CategoryModel } from '../../classes/CategoryModel'
import { ImageModel } from '../../classes/ImageModel'
import { FileUploadService } from '../../services/file-upload.service';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private fileUploadService: FileUploadService, private router: Router) {

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
          var img = {} as ImageModel;
          img.imageUri = downloadURL;
          this.imageModels.push(img);
          console.log('File available at', downloadURL);
        });
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

    console.log(this.imageModels);
  }

}
