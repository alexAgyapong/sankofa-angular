import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResult } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$: any;
  productResult$: Observable<ProductResult>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.productResult$ = this.productService.getProducts();
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories();
  }
}
