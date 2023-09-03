import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element/bundle';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ShopitemsComponent } from './shopitems/view/shopitems.component';
import { ShopitemsEditComponent } from './shopitems/edit/shopitems-edit.component';
import { ShopitemsAddComponent } from './shopitems/add/shopitems-add.component';
import { ShopitemsDeleteComponent } from './shopitems/delete/shopitems-delete.component';
import { ShopitemsViewOneComponent } from './shopitems/viewOne/shopitems-viewone.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { ContactComponent } from './contact/contact.component';


register();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh-SY_WiK5_rpn1y6efxem50bzAJUUQro",
  authDomain: "monali-32546.firebaseapp.com",
  projectId: "monali-32546",
  storageBucket: "monali-32546.appspot.com",
  messagingSenderId: "109368355128",
  appId: "1:109368355128:web:98ac0b576b5901b7ecb9cd",
  measurementId: "G-VKELVSKJRJ"
};

//// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ShopitemsComponent,
    ShopitemsEditComponent,
    ShopitemsDeleteComponent,
    ShopitemsAddComponent,
    ContactComponent,
    //ShopitemsViewOneComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ShopitemsViewOneComponent,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'shopitems', component: ShopitemsComponent },
      { path: 'shopitems-edit', component: ShopitemsEditComponent },
      { path: 'shopitems-add', component: ShopitemsAddComponent },
      { path: 'shopitems-delete', component: ShopitemsDeleteComponent },
      { path: 'shopitems-viewone', component: ShopitemsViewOneComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
