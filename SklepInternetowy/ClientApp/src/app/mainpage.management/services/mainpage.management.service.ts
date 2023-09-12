import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ArticleModel } from '../../classes/ArticleModel';
import { MainpagesectionService } from '../../shared/services/mainpagesection.service';

@Injectable({
  providedIn: 'root'
})
export class MainpageManagementService {

  public articles: ArticleModel[] = [];
  public newArticle: ArticleModel = {} as ArticleModel;
  file: File = {} as File;

  constructor(private service: MainpagesectionService)
  {
    this.loadArticles();
  }

  loadArticles() {
    this.service.loadArticles().subscribe(result => {
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

    this.service.delete(id).subscribe({
      complete: () => {
        this.loadArticles();
      }
    });
  }

  update(model: ArticleModel) {
    this.service.update(model).subscribe({
      complete: () => {
        this.loadArticles();
      }
    });
  }

  add() {
    this.service.add(this.newArticle).subscribe({
      complete: () => {
        this.loadArticles()
        this.newArticle = {} as ArticleModel;
      }
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
