import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './../shared/modules/material/material.module';
import { SearchComponent } from 'src/shared/components/search/search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from 'src/shared/app-interceptor';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { RemoveHtmlTagsPipe } from './shared/pipes/remove-html-tags.pipe';
import { DecodeHtmlStringPipe } from './shared/pipes/decode-html-string.pipe';

// Libraries

import { MdePopoverModule } from '@material-extended/mde';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SearchComponent,
    ProductListComponent,
    ProductCardComponent,
    FilterComponent,
    CategoryComponent,
    ProductDetailsComponent,
    RemoveHtmlTagsPipe,
    DecodeHtmlStringPipe
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ReactiveFormsModule,
  LayoutModule,
  MaterialModule,
  AppRoutingModule,
  MdePopoverModule,
  RatingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
