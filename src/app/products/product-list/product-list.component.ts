import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  searchParams: any;
  products$: Observable<any>;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.getProducts(this.searchParams);
    });
  }

  getProducts(req?: any): void {
    this.products$ = this.productService.getProducts(req);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
