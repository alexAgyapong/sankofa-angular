import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: '', pathMatch: 'full', redirectTo: '/home' },
{
  path: 'products', children: [
    { path: '', component: ProductListComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
