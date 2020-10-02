import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductResult } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';
import { RequestOption } from './../../../shared/models/request-option';
import { Product } from './../../../shared/models/product';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  searchParams: RequestOption;
  productResult$: Observable<ProductResult>;
  products: Product[] = [];
  subscription: Subscription;
  pageNumber = 0;
  pageSize = 48;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 60;
  strokeWidth: 2;

  @ViewChildren('productsDiv') productElements: QueryList<ElementRef>;
  isLoading = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }


  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.pageNumber = params?.page ? +params.page : 0;
      // this.test();
      this.searchParams = { ...this.searchParams, perPage: this.pageSize };
      console.log('params', this.searchParams);

      this.getProducts(this.searchParams);
    });
  }

  private test() {
    if (this.pageNumber > 1 && !this.products.length) {
      const products = this.getProductsFromLocalStorage();
      this.products = products;
      console.log('page size', this.pageSize, 'page number', this.pageNumber, { products });

    }
  }

  ngAfterViewInit(): void {
    this.scrollToLastProduct();
  }

  scrollToLastProduct(): void {
    console.log('loading', this.isLoading);
    if (this.pageNumber > 1) {
      setTimeout(() => {
        this.productElements.changes.subscribe(x => {
          const lastElement = this.productElements.last;
          lastElement?.nativeElement?.scrollIntoView();
          console.log({ lastElement });
        });
      });
    }
  }

  getProducts(req?: RequestOption): void {
    this.isLoading = true;
    this.productResult$ = this.productService.getProducts(req)
      .pipe(
        tap((res: ProductResult) => {
          if (res) {
            this.isLoading = false;
            // this.pageNumber === 1 ? this.products = res.products
            //   : this.products = this.products.concat(res?.products);
            if (this.pageNumber === 1) {
              this.products = res.products;
            } else {
              const products = this.getProductsFromLocalStorage();
              if (this.pageNumber > 1 && !this.products.length && products.length) {
                this.products = products;
                console.log('page size', this.pageSize, 'page number', this.pageNumber, { products });
              } else {
                this.products = this.products.concat(res?.products);
              }
            }
            console.log('all products', this.products);
            this.addProductsToLocalStorage();
            this.scrollToLastProduct();
          }
        }),
        map(data => ({ ...data, products: this.products })),
        tap(result => console.log(result.products, 'test...'))
      );
  }


  loadMore(): void {
    ++this.pageNumber;
    const start = this.setStartPage(this.pageSize, this.pageNumber);
    this.router.navigate(['/products'],
      {
        queryParams:
          { start, page: this.pageNumber },
        queryParamsHandling: 'merge'
      });
    console.log('page number', this.pageNumber, { start });
  }


  setStartPage(size: number, page: number): number {
    return (size * (page - 1) + (page - 1));
  }

  addProductsToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getProductsFromLocalStorage(): Product[] {
    const res = localStorage.getItem('products');
    return JSON.parse(res) as Product[];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
