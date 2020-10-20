import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ProductResult, Category } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$: any;
  productResult$: Observable<ProductResult>;
  selectedCategoryImages: { id: string, name: string, imgUrl: string }[] = [
    { id: '1-32838', name: 'Clothes', imgUrl: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
    { id: '1-32809', name: 'Pet Supplies', imgUrl: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' },
    { id: '1-32842', name: 'Home Store', imgUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
    { id: '1-32840', name: 'Party Supplies', imgUrl: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
    { id: '1-32810', name: 'Toys', imgUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
    { id: '1-32844', name: 'Sports & Fitness', imgUrl: 'https://images.unsplash.com/photo-1518617840859-acd542e13a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' }
  ];
  
  slides = [{ image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
  { image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80' },
  { image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
  { image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' },
  { image: 'https://images.unsplash.com/photo-1518617840859-acd542e13a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60' }];

  selectedCategories = ['1-32838', '1-32809', '1-32842', '1-32840', '1-32810', '1-32844'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productResult$ = this.productService.getProducts();
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories()
      .pipe(
        map((data: Category[]) => {
          const selected = data.filter(c => this.selectedCategories.includes(c.id));
          return selected;
        })
      );
  }
}
