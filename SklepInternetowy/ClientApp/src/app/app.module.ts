import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { MatCarouselModule } from '@thouet/material-carousel';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ShopitemsComponent } from './shopitems/view/shopitems.component';
import { ShopitemsEditComponent } from './shopitems/edit/shopitems-edit.component';
import { ShopitemsAddComponent } from './shopitems/add/shopitems-add.component';
import { ShopitemsDeleteComponent } from './shopitems/delete/shopitems-delete.component';
import { ShopitemsViewOneComponent } from './shopitems/viewOne/shopitems-viewone.component';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ContactComponent } from './contact/contact.component';
import { MainpageManagementComponent } from './mainpage.management/mainpage.management.component';
import { CategoryManagementComponent } from './category.management/category.management.component';
import { ContactinfoManagementComponent } from './contactinfo.management/contactinfo.management.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './shared/services/AuthGuard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatuteComponent } from './statute/statute.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FooterMenuComponent } from './footer-menu/footer-menu.component';
import { SafeHtmlPipe } from './safe-html.pipe';

//// Initialize Firebase
const app = initializeApp(environment.firebase);
const storage = getStorage(app);

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AppComponent,
    NavMenuComponent,
    FooterMenuComponent,
    HomeComponent,
    ShopitemsComponent,
    ShopitemsEditComponent,
    ShopitemsDeleteComponent,
    ShopitemsAddComponent,
    ContactComponent,
    MainpageManagementComponent,
    CategoryManagementComponent,
    ContactinfoManagementComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ShopitemsViewOneComponent,
    StatuteComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    MatCarouselModule,
    PhotoGalleryModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'shopitems', component: ShopitemsComponent },
      { path: 'shopitems-edit', component: ShopitemsEditComponent, canActivate: [AuthGuard] },
      { path: 'shopitems-add', component: ShopitemsAddComponent, canActivate: [AuthGuard] },
      { path: 'shopitems-delete', component: ShopitemsDeleteComponent, canActivate: [AuthGuard] },
      { path: 'shopitems-viewone', component: ShopitemsViewOneComponent, pathMatch: 'full' },
      { path: 'contact', component: ContactComponent, pathMatch: 'full' },
      { path: 'mainpage-management', component: MainpageManagementComponent, canActivate: [AuthGuard] },
      { path: 'category-management', component: CategoryManagementComponent, canActivate: [AuthGuard] },
      { path: 'contactinfo-management', component: ContactinfoManagementComponent, canActivate: [AuthGuard] },
      { path: 'sign-in', component: SignInComponent },
      { path: 'register-user', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'statute', component: StatuteComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
