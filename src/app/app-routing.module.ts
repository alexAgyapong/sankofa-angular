import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: '', pathMatch: 'full', redirectTo: '/home' },
{
  path: 'products', children: [
    { path: '', component: ProductListComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
