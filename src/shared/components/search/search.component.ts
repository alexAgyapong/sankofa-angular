import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  categories = [{ name: 'Shirts', id: 1 }, { name: 'shoes', id: 2 }];
  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());
  categories$: Observable<any>;

  constructor(private fb: FormBuilder,
              private breakPointObserver: BreakpointObserver,
              private productService: ProductService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.setupForm();
    this.searchForm.valueChanges.subscribe(input => console.log({ input }));
  }

  setupForm(): void {
    this.searchForm = this.fb.group({
      term: [''],
      categoryId: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue(params);
    });
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories();
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
