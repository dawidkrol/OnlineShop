import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ArticleModel } from '../classes/ArticleModel';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

@Component({
  selector: 'app-mainpage.management',
  templateUrl: './mainpage.management.component.html',
  styleUrls: ['./mainpage.management.component.css']
})
export class MainpageManagementComponent implements OnInit {

  public articles: ArticleModel[] = [];
  public newArticle: ArticleModel = {} as ArticleModel;
  file: File = {} as File;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadArticles();
  }

  ngOnInit(): void {
  }

  loadArticles() {
    this.http.get<ArticleModel[]>(this.baseUrl + 'articles').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

  delete(id: any) {
    try {
      this.onDeleteImg(id);
    }
    catch {
      console.log('Deleting img error');
    }

    let httpParams = new HttpParams().set('id', id).set('observe', 'response');

    let options = { params: httpParams };

    this.http.delete(this.baseUrl + 'articles', options).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadArticles();
      });
  }

  update(model: ArticleModel) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(model);
    console.log(body);
    this.http.put(this.baseUrl + 'articles', body, { headers: headers }).subscribe(
      () => console.log('HTTP request completed.')
    );
  }

  add() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(this.newArticle);
    console.log(body);
    this.http.post(this.baseUrl + 'articles', body, { headers: headers }).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => {
        console.log('HTTP request completed.');
        this.loadArticles()
        this.newArticle = {} as ArticleModel;
      }
    );
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload(articeId: string) {
    console.log(this.file);

    const storage = getStorage();
    const storageRef = ref(storage, 'mainPage/' + this.file.name);

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
          var art = this.articles.find(x => x.id == articeId) ?? {} as ArticleModel;
          if (art.imageUrl != "") {
            try {
              this.deleteIMG(art.imageUrl);
            }
            catch {
              console.log('Deleting error');
            }
          }
          art.imageUrl = downloadURL;
        });
      }
    );
  }

  onDeleteImg(articeId: string) {
    if (articeId == '') {
      var art = this.newArticle;
      this.deleteIMG(art.imageUrl);
      art.imageUrl = "";
    }
    else {
      var art = this.articles.find(x => x.id == articeId) ?? {} as ArticleModel;
      this.deleteIMG(art.imageUrl);
      art.imageUrl = "";
    }
  }

  deleteIMG(url: string) {
    const storage = getStorage();
    const rr = ref(storage, url);
    deleteObject(rr);
  }

  onUploadPicturetoNewArticle() {
    const storage = getStorage();
    const storageRef = ref(storage, 'mainPage/' + this.file.name);

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
          var art = this.newArticle;
          if (art.imageUrl != "") {
            try {
              this.deleteIMG(art.imageUrl);
            }
            catch {
              console.log('Deleting error');
            }
          }
          art.imageUrl = downloadURL;
        });
      }
    );
  }
}
