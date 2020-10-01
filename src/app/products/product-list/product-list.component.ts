import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductResult } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';
import { RequestOption } from './../../../shared/models/request-option';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {

  searchParams: RequestOption;
  productResult$: Observable<ProductResult>;
  subscription: Subscription;
  pageNumber = 0;
  pageSize = 30;
  @ViewChildren('productsDiv') products: QueryList<ElementRef>;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }


  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.pageNumber = params?.page ? +params.page : 0;
      this.searchParams = { ...this.searchParams, perPage: this.pageSize };
      console.log('params', this.searchParams);

      this.getProducts(this.searchParams);
    });
  }

  ngAfterViewInit(): void {
    this.scrollToLastProduct();
  }

  scrollToLastProduct(): void {
    console.log('loading', this.isLoading);
    if (this.pageNumber > 1) {
      setTimeout(() => {
        this.products.changes.subscribe(x => {
          const lastElement = this.products.last;
          lastElement?.nativeElement?.scrollIntoView();
          console.log({ lastElement });
        });
      });
    }
  }

  getProducts(req?: RequestOption): void {
    this.isLoading = true;
    this.productResult$ = this.productService.getProducts(req)
      .pipe(tap(res => { if (res) { this.isLoading = false; this.scrollToLastProduct(); } }));
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
