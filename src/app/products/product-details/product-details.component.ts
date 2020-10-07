import { BreakpointObserver } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/shared/services/product.service';
import { Observable } from 'rxjs';
import { ProductData } from 'src/shared/models/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$ = new Observable<ProductData>();

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private breakPointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    private productService: ProductService) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params?.id as string;
      if (productId) { this.getProductDetails(productId); }
    });
  }

  getProductDetails(productId: string): void {
    this.product$ = this.productService.getProductDetails(productId);
  }

  scrollTo(el: HTMLElement): void {
    el.scrollIntoView();
  }

  goBack(): void {
    this.location.back();
  }
}
