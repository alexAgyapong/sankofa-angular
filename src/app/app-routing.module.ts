import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: '', pathMatch: 'full', redirectTo: '/home' },
{
  path: 'list', children: [
    { path: '', component: PropertyListComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
