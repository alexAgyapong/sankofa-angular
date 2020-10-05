import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, AfterViewInit, ViewChildren, HostListener, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ProductResult } from 'src/shared/models/product';
import { ProductService } from 'src/shared/services/product.service';
import { RequestOption } from './../../../shared/models/request-option';
import { Product } from './../../../shared/models/product';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';


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
  @ViewChild('productsContainer') container: ElementRef;
  isLoading = true;

  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(private route: ActivatedRoute,
    private router: Router,
    private breakPointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    private productService: ProductService) {

  }

  // @HostListener('window:scroll', [])
  // checkScroll() {
  //   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  //   console.log({ scrollPosition }, 'scrolll......');

  // }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.pageNumber = params?.page ? +params.page : 0;
      this.searchParams = { ...this.searchParams, perPage: this.pageSize };

      this.getProducts(this.searchParams);
    });
  }

  ngAfterViewInit(): void {
    this.scrollToLastProduct();

    // this.onWindowScroll();
  }

  scrollToLastProduct(): void {
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
              } else {
                this.products = this.products.concat(res?.products);
              }
            }
            this.addProductsToLocalStorage();
            this.scrollToLastProduct();
          }
        }),
        map(data => ({ ...data, products: this.products }))
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

  scrollToTop(el: HTMLElement): void {
    el.scrollIntoView();
  }

  onWindowScroll(): void {
    this.scrollDispatcher.scrolled().subscribe(x => {
      const scrollPosition = this.container.nativeElement.scrollTop;
      console.log('I am scrolling', scrollPosition);
    });
  }

  showFilter(template: TemplateRef<any>, result: ProductResult): void {
    this.dialog.open(template, { data: result, panelClass: ['full-screen-modal'] });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
