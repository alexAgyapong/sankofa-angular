import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EMPTY, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/shared/models/product';
import { RequestOption } from './../../models/request-option';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('term') searchInput: ElementRef;
  searchForm: FormGroup;
  categories$: Observable<any>;
  productAutocomplete$: Observable<Product[]>;
  
  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(private fb: FormBuilder,
              private breakPointObserver: BreakpointObserver,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.setupForm();
    // this.searchForm.get('categoryId').valueChanges.subscribe(input => console.log({ input }));
  }

  setupForm(): void {
    this.searchForm = this.fb.group({
      term: [''],
      categoryId: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue(params);
    });


    this.productAutocomplete$ = this.searchForm.get('term').valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      tap(res => console.log(res, 'in search')),
      switchMap((term: string) => {
        if (term !== '') { return this.productsLookup(term); } else { return EMPTY; }
      }
      ));
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories();
  }

  productsLookup(term: string): Observable<Product[]> {
    let req: RequestOption;
    req = { ...this.searchForm?.value, term };
    return this.productService.getProducts(req).pipe(map(res => res.products));
  }

  onCategoryChange(): void {
    this.searchForm.get('term').setValue('');

    // setTimeout(() => {
    //   this.searchInput.nativeElement.focus();
    // });
  }

  search(): void {
    this.router.navigate(['/products'],
      {
        queryParams: {
          ...this.searchForm?.value,
          page: '1', start: ''
        }
      });
  }
}
